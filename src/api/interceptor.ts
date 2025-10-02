import axios from 'axios'
import { API_URL } from './endpoints'
import store from 'store2'
import { getAccessTokenByRefresh } from './getAccessTokenByRefresh'
import { AUTH_STORE_NAME } from '@/config/store2.config'

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(
	config => {
		const authStorage = store.get('AUTH_STORE_NAME-todo')
		const accessToken = authStorage?.state?.accessToken

		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		console.log('< REQUEST > - ', config)
		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	response => {
		console.log('< RESPONSE > - ', response)

		return response
	},
	async error => {
		console.log('< RESPONSE ERROR > - ', error)

		const originalRequest = error.config

		if (error.response?.status === 401) {
			const authStorage = store.get(AUTH_STORE_NAME)
			const refreshToken = authStorage?.state?.refreshToken

			if (refreshToken && !originalRequest._isRetry) {
				originalRequest._isRetry = true
				try {
					await getAccessTokenByRefresh()
					return instance.request(originalRequest)
				} catch {
					store.remove(AUTH_STORE_NAME)
					// window.location.href = AppRouter.LOGIN
				}
			} else {
				store.remove(AUTH_STORE_NAME)
				// window.location.href = AppRouter.LOGIN
			}
		}

		return Promise.reject(error)
	}
)

export default instance
