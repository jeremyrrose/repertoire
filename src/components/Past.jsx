import React from 'react';
import { Performance } from './';

export const Past = (props) => {

    if (props.past) {
        const past = [ ...props.past ];
        const pastArray = past.map((perf, i) => <Performance key={i} data={perf} projectKeys={props.projectKeys} /> );


        return (
            <div className="past">
                <h4>past performances</h4>
                { pastArray }
            </div>
        )

    }

    return null;

}