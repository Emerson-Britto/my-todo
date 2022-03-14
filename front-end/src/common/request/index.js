import axios from 'axios';
import { DataStorage } from '../storage';

class Request {
	constructor() {
		this.BaseUrl = 'localhost:1234';
	}

	async login(loginForm) {
		await axios.post(`${this.BaseUrl}/account/login`, loginForm)
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

	viewAllTask() {
		return axios.get(`${this.BaseUrl}/task/all`, {
			headers: {
				Authorization: DataStorage.getToken()
			}
		});
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