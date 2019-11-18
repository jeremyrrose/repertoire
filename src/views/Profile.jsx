import React from 'react';
import { Info, Instruments, Projects, Education, Upcoming, Past } from '../components/';

export const Profile = (props) => {

    return (
        <main>
            <section className="primaryInfo">
                <Info />
                <Instruments />
                <Projects />
                <Education />
            </section>
            <section className="feed">
                <Upcoming />
                <Past />
            </section>
        </main>
    )

}

export default Profile;