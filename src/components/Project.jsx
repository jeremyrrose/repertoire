import React from 'react';
import spotifyLogo from '../images/spotify-logo-svgrepo-com.svg';

const Project = ({ data, id, select, index }) => {

    const { avatar, name, spotify, yourInstrument, userId } = data;
    const edit = id === userId && (<button index={index} onClick={select}>Edit this project</button>);

    return (
        <>
        <div className="project">
            <img src={avatar} alt={name} />
            <div>
                <div className="projectTopRow">
                    <h4>{name}</h4>
                    <p>{yourInstrument.toLowerCase()}</p>
                </div>
                <div className="projectBottomRow">
                    <p><a href={spotify} target="_blank"><img src={spotifyLogo} alt="listen on Spotify" /> Listen on Spotify</a></p>
                </div>
            </div>
            {edit}
        </div>
        </>
    )

}

export default Project;