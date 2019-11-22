import React from 'react';
import { Redirect } from 'react-router-dom';
import EditUser from './EditUser';
import { Projects } from '../components';
import { ProjectForm, SpotifySearch } from '../forms/';
import { getSingleUser, getUserProjects, getProjectPerformances, createProject, updateProject } from '../services/ApiCalls';
import { spotifySearch } from '../services/ApiConfig';
import '../styles/Profile.css';
import '../styles/Manage.css';
import '../styles/Signup.css';

export class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            performances: [],
            projectKey: '',
            project: {
                name: '',
                avatar: '',
                spotify: '',
                website: '',
                yourInstrument: ''
            },
            spotifyString: '',
            spotifyResults: [],
            complete: false
        }
    }

    componentDidMount = async () => {
            await this.fetchAll(this.props.userId);
            this.setState({ which: 'user' });
    }

    fetchAll = async (user_id) => {
        try {
            const userData = await getSingleUser(user_id);
            const userProjects = await getUserProjects(user_id);
            const userPerformances = await this.getPerformances(user_id,userProjects);
            const upcoming = userPerformances.filter(perf => Date.parse(perf.date) > Date.parse(new Date())).sort((a,b) => new Date(a.date) - new Date(b.date));
            const past = userPerformances.filter(perf => new Date(perf.date) < new Date()).sort((a,b) => new Date(b.date) - new Date(a.date));
            this.setState({
                profile: { ...userData },
                projects: userProjects,
                performances : {
                    upcoming: [ ...upcoming ],
                    past: [ ...past ]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    getPerformances = async (user_id,projects) => {
        const performances = [];
        for (let i = 0; i < projects.length; i++) {
            const projPerf = await getProjectPerformances(user_id,projects[i].id);
            projPerf.forEach(perf => performances.push(perf));
        }
        return performances;
    }

	handleChange = (e) => {
        this.setState({ project: {
            ...this.state.project,
            [e.target.name]: e.target.value 
            }
        });
    }

    handleSpotifySearch = async (e) => {
        this.setState({ spotifyString: e.target.value });
        if (this.state.spotifyString.length > 3) {
            const resp = await spotifySearch(e.target.value);
            if (resp) {
                this.setState({ spotifyResults: resp.data.artists.items });
            }     
        }
    }

    handleSpotifySubmit = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const bandInfo = this.state.spotifyResults[id];
        this.setState(state => ({
            spotifyString: '',
            project: {
                ...state.project,
                name: bandInfo.name,
                avatar: bandInfo.images[0].url,
                spotify: bandInfo.external_urls.spotify
            }
        }));
    }
    
    projectSubmit = (e) => {
		e.preventDefault();
		createProject(this.props.userId, this.state.project)
		.then(this.setState({complete: true}))
        .then(this.fetchAll(this.props.userId))
		.catch(() => this.setState({ errorMsg: 'There was an error!' }))
    }
    
    projectSelect = (index) => {
        this.setState(state => ({
            projectKey: index,
            project: { ...state.projects[index] }
        }));
    }

    projectUpdate = (e) => {
        e.preventDefault();
        updateProject(this.props.userId, this.state.projects[this.state.projectKey].id, this.state.project)
		.then(this.setState({complete: true}))
        .then(this.fetchAll(this.props.userId))
		.catch(() => this.setState({ errorMsg: 'There was an error!' }))
    }

    render() {

        const ManageButton = ({view}) => {
            return (
                <button onClick={() => this.setState({ which: view })}>{view}</button>
            )
        }

        const { name, avatar, spotify, website, yourInstrument } = this.state.project;
        const submit = this.state.projectKey ? (this.projectUpdate) : (this.projectSubmit);

        if (!this.props.userId) return <Redirect to='/' />;

        if (this.state.which === `user`) {
            return (
                <>
                Click to manage:
                <ManageButton view='user' />
                <ManageButton view='projects' />
                <EditUser userId={this.props.userId} />
                </>
            )
        }

        if (this.state.which === `projects`) {
        return (
            <>
            Click to manage:
            <ManageButton view='user' />
            <ManageButton view='projects' />
            <main className="manage">
                <Projects projects={this.state.projects} userId={this.props.userId} select={this.projectSelect} />
                <ProjectForm onChange={this.handleChange} onSubmit={submit} formData={{ name, avatar, spotify, website, yourInstrument }} projectKey={this.state.projectKey} />
                <SpotifySearch onSubmit={(e) => e.preventDefault()} onChange={this.handleSpotifySearch} spotifySubmit={this.handleSpotifySubmit} formData={this.state.spotifyString} results={this.state.spotifyResults.slice(0,6)} />
            </main>
            </>
        )
        }

        return null;
    }
}
