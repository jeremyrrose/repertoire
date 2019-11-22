import React from 'react';
import { Redirect } from 'react-router-dom';
import { Info, Instruments, Projects, Education, Upcoming, Past } from '../components/';
import { getSingleUser, getUserProjects, getProjectPerformances } from '../services/ApiCalls';
import '../styles/Profile.css';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            performances: [],
            profileId: ''
        }
    }

    componentDidMount = async () => {
        await this.fetchAll(this.props.match.params.profile_id);
        await this.setState({profileId: this.props.match.params.profile_id});
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

    render = () => {       

        const { first, last, city, state, education, instruments, avatar } = this.state.profile;
        const projects = this.state.projects;
        const projectKeys = {};
        projects.forEach(proj => projectKeys[proj.id] = proj.name);
        const { upcoming, past } = this.state.performances;
        const { user_id } = this.props.match.params;

        // setting this up below to make bad public profile addresses redirect to browse; not done, so it's commented
        // const profile_id = this.state.profileId;
        // const keys = this.props.userKeys;

        return (
            <main>
                <section className="primaryInfo">
                    <Info first={first} last={last} city={city} state={state} avatar={avatar} />
                    <Instruments instruments={instruments} />
                    <Projects user_id={user_id} projects={projects} /> 
                    <Education education={education} />
                </section>
                <section className="feed">
                    <Upcoming upcoming={upcoming} projectKeys={projectKeys} />
                    <Past past={past} projectKeys={projectKeys} />
                </section>
            </main>
        )

    }

}