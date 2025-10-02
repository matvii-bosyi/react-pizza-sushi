import axios from 'axios'
import { API_URL } from './endpoints'

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(
	config => {
		console.log('< REQUEST > - ', config)

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		console.log('< RESPONSE > - ', response)

		return response
	},
	error => {
		return Promise.reject(error)
	}
)

export default instance
