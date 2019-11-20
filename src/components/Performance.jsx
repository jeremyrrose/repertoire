import React from 'react';

export const Performance = (props) => {
    const { projectKeys } = props;
    const { projectId } = props.data;
    console.log(`projectKeys[projectId]`, projectKeys[11]);


    return (
        <div className="performance">
            <p className="date">{props.data.date.slice(0,10)}</p>
            <div className="venue">
                <p>{props.data.venue}</p>
                <p>{props.data.city}, {props.data.state}</p>
            </div>
            <p className="perfProj">{ projectKeys[projectId] }</p>
        </div>
    )

}