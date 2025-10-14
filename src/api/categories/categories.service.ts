import { CATEGORIES_GET_ALL_API_URL, CATEGORIES_GET_TOP_API_URL } from '../config'
import instance from '../config/interceptor'

export const CategoriesService = {
	getAll: () =>
		instance({
			method: 'GET',
			url: CATEGORIES_GET_ALL_API_URL
		}),
	getTop: () =>
		instance({
			method: 'GET',
			url: CATEGORIES_GET_TOP_API_URL
		}),
}
