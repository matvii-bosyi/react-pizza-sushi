import axios from 'axios'
import store from 'store2'
import { API_URL, AUTH_REFRESH_API_URL } from './endpoints'
import type { IRefresh_Response } from './types/auth.interface'
import { AUTH_STORE_NAME } from '@/config/store2.config'

export const getAccessTokenByRefresh = async () => {
	try {
		const authStorage = store.get(AUTH_STORE_NAME)
		const refreshToken = authStorage?.state?.refreshToken
		const version = authStorage?.version

		if (!refreshToken) return null

		const response = await axios.post<IRefresh_Response>(
			API_URL + AUTH_REFRESH_API_URL,
			{ refreshToken },
			{ withCredentials: true }
		)

		const accessToken = response.data.data.access_token

		store.set(AUTH_STORE_NAME, {
			state: {
				accessToken,
				refreshToken
			},
			version: (version || 1) + 1
		})
	} catch (e) {
		console.error('refresh failed:', e)
		store.remove(AUTH_STORE_NAME)
		return null
	}
}
