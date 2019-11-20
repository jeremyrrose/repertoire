import React from 'react';
import { Info, Instruments, Projects, Education, Upcoming, Past } from '../components';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../services/ApiCalls';

export function Profile (props) {
    
    const { user_id } = useParams();
    console.log(user_id);
    if (props.profile.id != user_id) {
        props.urlUser(user_id);
    }

    console.log(props.profile);
    const { first, last, city, state, education, instruments, projects } = props.profile;
    console.log(projects);

    return (
        <main>
            <section className="primaryInfo">
                <Info first={first} last={last} city={city} state={state} />
                <Instruments instruments={instruments}/>
                <Projects user_id={user_id} />
                <Education education={education} />
            </section>
            <section className="feed">
                <Upcoming />
                <Past />
            </section>
        </main>
        )
}