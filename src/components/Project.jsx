import React from 'react';

const Project = ({ data, id, select, index }) => {

    const { avatar, name, spotify, yourInstrument, userId } = data;
    const edit = id === userId && (<button index={index} onClick={select}>Edit this</button>);

    return (
        <div className="project">
            <img src={avatar} alt={name} />
            <div>
                <div className="projectTopRow">
                    <h4>{name}</h4>
                    <p>{yourInstrument}</p>
                </div>
                <div className="projectBottomRow">
                    <p><a href={spotify} target="_blank">Listen on Spotify</a></p>
                </div>
            </div>
            {edit}
        </div>
    )

}

export default Project;