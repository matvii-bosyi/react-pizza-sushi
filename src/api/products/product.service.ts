import {
	PRODUCTS_GET_BY_CATEGORY_IN_RESTAURANT_API_URL,
	PRODUCTS_GET_BY_ID_API_URL,
	PRODUCTS_GET_CATEGORIES_FOR_RESTAURANT_API_URL
} from '../config'
import instance from '../config/interceptor'

export const ProductService = {
	getById: (id: string) =>
		instance({
			method: 'GET',
			url: PRODUCTS_GET_BY_ID_API_URL(id)
		}),
	getCategoriesForRestaurant: (restaurantId: string) =>
		instance({
			method: 'GET',
			url: PRODUCTS_GET_CATEGORIES_FOR_RESTAURANT_API_URL(restaurantId)
		}),

	getProductsByCategoryInRestaurant: (
		restaurantId: string,
		categoryId: string
	) =>
		instance({
			method: 'GET',
			url: PRODUCTS_GET_BY_CATEGORY_IN_RESTAURANT_API_URL(restaurantId),
			params: { categoryId: categoryId }
		})
}
