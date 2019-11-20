import React from 'react';
import { Performance } from './';

export const Upcoming = (props) => {

    console.log(props);

    if (props.upcoming) {
        const upcoming = [ ...props.upcoming ];
        const upcomingArray = upcoming.map((perf, i) => <Performance key={i} data={perf} projectKeys={props.projectKeys} /> );

        if (upcoming.length > 0) {
            return (
                <div className="upcoming">
                    <h4>upcoming performances</h4>
                    { upcomingArray }
                </div>
            )
        }

    }

    return null;

}