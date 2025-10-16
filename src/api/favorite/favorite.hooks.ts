import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FavoriteService } from './favorite.service'
import type { IGetFavoritesResponse, IToggleFavoriteRequest } from './favorite.types'
import type { IGet_All_Restaurants_Response, IGet_Top_Restaurants_Response } from '../restaurant/restaurant.types'
import type { IGet_Product_By_Id_Response } from '../products/product.types'

export const useFavoritesQuery = () =>
	useQuery({
		queryKey: ['favorites'],
		queryFn: () => FavoriteService.getAll().then(res => {
			const data = res.data.data as IGetFavoritesResponse
			data.products = data.products.map(p => ({ ...p, price: Number(p.price) }))
			return data
		}),
	})

export const useToggleFavoriteQuery = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: (data: IToggleFavoriteRequest) => FavoriteService.toggle(data),
		onSuccess: (_, variables) => {
            const { type, restaurantId, productId } = variables;

            queryClient.invalidateQueries({ queryKey: ['favorites'] });

            if (type === 'restaurant') {
                queryClient.setQueryData<IGet_All_Restaurants_Response>(['restaurants'], (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        restaurants: oldData.restaurants.map(r =>
                            r.id === restaurantId ? { ...r, isFavorite: !r.isFavorite } : r
                        ),
                    };
                });

				queryClient.setQueryData<Array<IGet_Top_Restaurants_Response>>(['top-restaurants'], (oldData) => {
                    if (!oldData) return oldData;
                    return oldData.map(r =>
                        r.id === restaurantId ? { ...r, isFavorite: !r.isFavorite } : r
                    );
                });


            }

            if (type === 'product') {
                queryClient.setQueryData<IGet_Product_By_Id_Response>(['product', productId], (oldData) => {
                    if (!oldData) return oldData;
                    return { ...oldData, isFavorite: !oldData.isFavorite };
                });

                queryClient.invalidateQueries({ queryKey: ['products'] });
            }
		},
	})
}
