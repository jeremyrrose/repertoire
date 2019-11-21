import Axios from 'axios';
const BASE_URL = `https://5dced59c75f9360014c26436.mockapi.io/`

export const api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		// 'Access-Control-Allow-Origin': '*'
	}
})


const SPOTIFY_AUTH = process.env.REACT_APP_SPOTIFY_AUTH;
const tokenRequestBody = 'grant_type=client_credentials';
const myStorage = window.localStorage;

export const spotifyGetToken = async () => {
	try {
		const response = await Axios.post('https://accounts.spotify.com/api/token', tokenRequestBody, {	headers: { "Authorization": `Basic ${SPOTIFY_AUTH}` } } );
		return response.data.access_token;
	} catch (error) {
		console.log(error);
	}
}

export const spotifySearch = async (string) => {

	const setToken = async () => {
		const token = await spotifyGetToken();
		myStorage.setItem('spotifyToken', token);
		myStorage.setItem('tokenTime', new Date().getTime());
		console.log(myStorage);
	}

	if (!myStorage.getItem('spotifyToken') || Number(myStorage.getItem('tokenTime')) + 3500000 < new Date().getTime()) {
		setToken();
	}

	try {
		const response = await Axios.get(`https://api.spotify.com/v1/search?q=${string}*&type=artist`,{ headers: {'Authorization': `Bearer ${myStorage.getItem('spotifyToken')}`} });
		return response;
	} catch (error) {
		console.log(error);
		if (error.response.status === 401) {
			console.log(`it's 401!`);
			setToken();
		}
	}
}