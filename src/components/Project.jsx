import React from 'react';

const Project = ({data}) => {

    const { avatar, name, spotify, yourInstrument } = data;

    return (
        <div className="project">
            <img src={avatar} alt={name} />
            <div className="projectTopRow">
                <h4>{name}</h4>
                <p>{yourInstrument}</p>
            </div>
            <div className="projectBottomRow">
                <p>{spotify}</p>
            </div>
        </div>
    )

}

export default Project;