import React from 'react';
import { Input } from '../shared';
import '../styles/SpotifySearch.css';

export const SpotifyButton = (props) => {
    const { title, onSubmit, id } = props;
    let { img } = props;
    img === null && (img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3YGiTaWc7_ZfWfRoGxLNy0FgPFOp2VSD1sK_O7ZuvlpYXylgB');
    return (
        <button id={id} className="spotify" onClick={onSubmit}>
            <img src={img} alt={title} /> <h4>{title}</h4>
        </button>
    );
}

export const SpotifySearch = (props) => {
    const { onSubmit, onChange, spotifySubmit, formData, results } = props;
    let spotifyButtons = null;
    if (formData.length < 4) {
        spotifyButtons = null;
    }
    if (results.length > 0) {
        spotifyButtons = results.map((result, i) => <SpotifyButton key={i} id={i} img={ result.images[0] ? result.images[result.images.length-1].url : null } title={result.name} onSubmit={spotifySubmit} />);
    }
    
	return (
        <>
		<form className='form' onSubmit={onSubmit} >

			<Input
                name='spotifySearch'
                value={formData}
                required={true}
                placeholder='Find your project on Spotify'
                onChange={onChange}
			/>

		</form>
        <form className='form' onSubmit={(e) => e.preventDefault} >
            { spotifyButtons }
        </form>
        </>
	)
}