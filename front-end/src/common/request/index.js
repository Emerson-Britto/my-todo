import axios from 'axios';
import { DataStorage } from '../storage';

// API WRAPPER
class Request {
	constructor() {
		this.BaseUrl = 'http://localhost:1234';
	}

	async login(loginForm) {
		return axios.post(`${this.BaseUrl}/account/login`, loginForm)
			.then(r => {
				const { ACCESS_TOKEN=null } = r.data;
				if (ACCESS_TOKEN) {
					DataStorage.setToken(ACCESS_TOKEN);
				}
				return r;
			});
	}

	async SignUp(signUpForm) {
		return axios.post(`${this.BaseUrl}/account/create`, signUpForm);
	}

	createTask(taskForm) {
		return axios.post(`${this.BaseUrl}/task/create`, taskForm, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		});
	}

	deleteTask(id) {
		return axios.delete(`${this.BaseUrl}/task/${id}`, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		});
	}

	updateTask(taskForm) {
		return axios.post(`${this.BaseUrl}/task/${taskForm.id}`, taskForm, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		});
	}

	viewAllTask() {
		return axios.get(`${this.BaseUrl}/task/all`, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		}).then(r => r.data);
	}

	viewTasksByDue(due) {
		return axios.get(`${this.BaseUrl}/task/all?due=${due}`, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		});
	}
}

export const request = new Request();