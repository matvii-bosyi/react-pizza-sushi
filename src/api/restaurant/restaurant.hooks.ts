import { useQuery } from '@tanstack/react-query'
import { RestaurantService } from './restaurant.service'
import type {
	IGet_All_Restaurants_Response,
	IGet_Restaurant_By_Id_Response,
	IGet_Top_Restaurants_Response
} from './restaurant.types'

export const useRestaurantsQuery = () =>
	useQuery({
		queryKey: ['restaurants'],
		queryFn: () =>
			RestaurantService.getAll().then(
				res => res.data.data as IGet_All_Restaurants_Response
			)
	})
export const useTopRestaurantsQuery = () =>
	useQuery({
		queryKey: ['top-restaurants'],
		queryFn: () =>
			RestaurantService.getTop().then(
				res => res.data.data as Array<IGet_Top_Restaurants_Response>
			)
	})

export const useRestaurantByIdQuery = (id: string) =>
	useQuery({
		queryKey: ['restaurant', id],
		queryFn: () => RestaurantService.getById(id).then(res => res.data.data as IGet_Restaurant_By_Id_Response),
		enabled: !!id
	})
