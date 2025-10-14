import instance from '../config/interceptor'
import {
	FAVORITES_ACTIONS_API_URL,
	FAVORITES_GET_ALL_API_URL,
} from '../config/endpoints'
import type { IToggleFavoriteRequest } from './favorite.types'

export const FavoriteService = {
	getAll: () =>
		instance({
			method: 'GET',
			url: FAVORITES_GET_ALL_API_URL,
		}),

	toggle: (data: IToggleFavoriteRequest) =>
		instance({
			method: 'POST',
			url: FAVORITES_ACTIONS_API_URL,
			data,
		}),
}
