import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BasketService } from './basket.service'
import type {
	IBasketGetAll_Response,
	IBasketGetCount_Response,
	IBasketAction_Request
} from './basket.types'

export const useBasketGetAllQuery = () =>
	useQuery({
		queryKey: ['basket'],
		queryFn: () =>
			BasketService.getAll().then(
				res => res.data.data as Array<IBasketGetAll_Response>
			)
	})

export const useBasketGetCountQuery = () =>
	useQuery({
		queryKey: ['basket'],
		queryFn: () =>
			BasketService.getCount().then(
				res => res.data.data as IBasketGetCount_Response
			)
	})

export const useBasketMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['basket action'],
		mutationFn: (data: IBasketAction_Request) => BasketService.action({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['basket'] })
			queryClient.invalidateQueries({ queryKey: ['products'] })
		}
	})
}

export const useClearBasketMutation = () => {
	const queryClient = useQueryClient()
	const { data: basketItems } = useBasketGetAllQuery()

	return useMutation({
		mutationKey: ['clear basket'],
		mutationFn: async () => {
			if (basketItems && basketItems.length > 0) {
				const removalPromises = basketItems.map(item =>
					BasketService.action({
						data: {
							productId: item.id,
							quantity: 0,
							restaurantId: item.restaurantId
						}
					})
				)
				await Promise.all(removalPromises)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['basket'] })
			queryClient.invalidateQueries({ queryKey: ['products'] })
		}
	})
}