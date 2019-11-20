import React from 'react';
import { Project } from '../components/';
import { getSingleUser, getUserProjects, getProjectPerformances } from '../services/ApiCalls';
import '../styles/Profile.css';

export class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            projects: [],
            performances: []
        }
    }

    componentDidMount = async () => {
        await this.fetchAll(this.props.userId);
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

    render() {

        return (

            <h1>{this.state.profile.username}</h1>

        )
    }
}
