import Axios from 'axios';
const BASE_URL = `https://5dced59c75f9360014c26436.mockapi.io/`

export const api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		// 'Access-Control-Allow-Origin': '*'
	}
})