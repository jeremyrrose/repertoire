import { api } from './ApiConfig';

export const getAllUsers = async () => {
	try {
		const resp = await api.get('/users');
		return resp.data;
	} catch (error) {
		throw error;
	}
}

export const getSingleUser = async (user_id) => {
	try {
		const resp = await api.get(`/users/${user_id}`);
		return resp.data;
	} catch (error) {
		throw error;
	}
}

export const getUserProjects = async (user_id) => {
	try {
		const resp = await api.get(`/users/${user_id}/projects`);
		return resp.data;
	} catch (error) {
		throw error;
	}
}

export const getProjectPerformances = async (user_id,project_id) => {
    try {
        const resp = await api.get(`/users/${user_id}/projects/${project_id}/performances`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}

export const userSignup = async (userData) => {
	try {
		const response = await api.post(`/users`, userData);
		console.log(response);
		return response;
	} catch (error) {
		throw error
	}
}

export const createProject = async (user, projectData) => {
	try {
		const response = await api.post(`/users/${user}/projects`, projectData);
		console.log(response);
		return response;
	} catch (error) {
		throw error
	}
}