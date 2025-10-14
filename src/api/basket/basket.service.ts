import { BASKET_ACTIONS_API_URL, BASKET_GET_ALL_API_URL, BASKET_GET_COUNT_API_URL } from '../config'
import instance from '../config/interceptor'
import type { IBasketAction_Request } from './basket.types'

export const BasketService = {
	action: ({data}: {data: IBasketAction_Request}) =>
		instance({
			method: 'POST',
			url: BASKET_ACTIONS_API_URL,
			data
		}),
	getAll: () =>
		instance({
			method: 'GET',
			url: BASKET_GET_ALL_API_URL
		}),
	getCount: () =>
		instance({
			method: 'GET',
			url: BASKET_GET_COUNT_API_URL
		})
}
