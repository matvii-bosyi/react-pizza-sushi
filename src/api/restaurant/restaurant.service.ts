import {
	RESTAURANTS_GET_ALL_API_URL,
	RESTAURANTS_GET_BY_ID_API_URL,
	RESTAURANTS_GET_TOP_API_URL
} from '../config/endpoints'

import instance from '../config/interceptor'

export const RestaurantService = {
	getAll: () =>
		instance({
			method: 'GET',
			url: RESTAURANTS_GET_ALL_API_URL
		}),
	getTop: () =>
		instance({
			method: 'GET',
			url: RESTAURANTS_GET_TOP_API_URL
		}),
	getById: (id: string) =>
		instance({
			method: 'GET',
			url: RESTAURANTS_GET_BY_ID_API_URL(id)
		})
}
