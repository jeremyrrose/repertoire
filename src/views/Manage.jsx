import React from 'react';
import { ProjectForm } from '../forms/';
import { getSingleUser, getUserProjects, getProjectPerformances, createProject } from '../services/ApiCalls';
import { spotifySearch, spotifyGetToken } from '../services/ApiConfig';
import '../styles/Profile.css';

export class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            performances: [],
            project: {
                name: '',
                avatar: '',
                spotify: '',
                website: '',
                yourInstrument: ''
            },
            complete: false
        }
    }

    componentDidMount = async () => {
            console.log(this.props.userId);
    //        await this.fetchAll(this.props.userId);
            const resp = await spotifySearch(`Total+War`);
            console.log(resp); 
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
    
    projectSubmit = (e) => {
		console.log(e);
		console.log(this.state.project);
		e.preventDefault();
		createProject(this.props.userId, this.state.project)
		.then(this.setState({complete: true}))
		.catch(() => this.setState({ errorMsg: 'There was an error!' }))
	}

    render() {

        const { name, avatar, spotify, website, yourInstrument } = this.state.project;

        return (

            <ProjectForm onChange={this.handleChange} onSubmit={this.projectSubmit} formData={ name, avatar, spotify, website, yourInstrument } />

        )
    }
}
