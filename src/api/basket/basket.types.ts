export interface IBasketAction_Request {
	productId: string
	quantity: number
	restaurantId: string
	sessionId?: string
}

export interface IBasketGetAll_Response {
	id: string
	restaurantId: string
	name: string
	description: string
	price: number
	weight: number
	image: string
	quantityInBasket: number
}

export interface IBasketGetCount_Response {
	count: number
}