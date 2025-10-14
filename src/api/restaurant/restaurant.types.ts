export interface IGet_Restaurant_By_Id_Response {
	id: string
	name: string
	address: string
	numberOfWorkers: number
	description: null
	banner: string
	rating: number
	logo: string
	workingHours: string
	cookingTime: number
	deliveryPrice: number
	minimumOrderPrice: number
}

export interface IGet_All_Restaurants_Response {
	restaurants: Array<{
		id: string
		name: string
		banner: string
		rating: number
		workingHours: string
		cookingTime: number
		deliveryPrice: number
		isFavorite: boolean
	}>
	meta: {
		totalItems: number
		totalPages: number
		currentPage: number
		limit: number
	}
}

export interface IGet_Top_Restaurants_Response {
	id: string
	name: string
	banner: string
	rating: number
	workingHours: string
	cookingTime: number
	deliveryPrice: number
	isFavorite: boolean
}
