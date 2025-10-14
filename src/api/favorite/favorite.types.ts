import type { IGet_All_Restaurants_Response } from '../restaurant/restaurant.types'

export interface IProduct {
	id: string
	restaurantId: string
	name: string
	description: string
	price: number
	weight: number
	image: string
	isFavorite: boolean
	quantityInBasket: null
}

export type FavoriteType = 'product' | 'restaurant'

export interface IToggleFavoriteRequest {
	type: FavoriteType
	productId?: string
	restaurantId?: string
}

export interface IGetFavoritesResponse {
	products: IProduct[]
	restaurants: IGet_All_Restaurants_Response['restaurants']
}
