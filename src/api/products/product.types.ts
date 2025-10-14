export interface IGet_Product_By_Id_Response {
	id: string
	restaurantId: string
	name: string
	description: string
	image: string
	price: number
	weight: number
	isFavorite: boolean
	quantityInBasket: null
}

export interface IGet_Categories_For_Restaurant_Response {
	id: string
	name: string
	banner: string
	rating: number
	workingHours: string
	cookingTime: number
	deliveryPrice: number
	favorites: unknown[]
	isFavorite: boolean
}

export interface IGet_Products_By_Category_For_Restaurant_Response {
	products: Array<{
		id: string
		restaurantId: string
		name: string
		description: string
		price: number
		weight: number
		image: string
		isFavorite: boolean
		quantityInBasket: number
	}>
}
