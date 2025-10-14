import { useQueries, useQuery } from '@tanstack/react-query'
import { ProductService } from './product.service'
import type {
	IGet_Categories_For_Restaurant_Response,
	IGet_Product_By_Id_Response,
	IGet_Products_By_Category_For_Restaurant_Response
} from './product.types'

export const useProductByIdQuery = (productId: string) =>
	useQuery({
		queryKey: ['product', productId],
		queryFn: () =>
			ProductService.getById(productId).then(
				res => res.data.data as IGet_Product_By_Id_Response
			),
		enabled: !!productId
	})

export const useCategoriesForRestaurantQuery = (restaurantId: string) =>
	useQuery({
		queryKey: ['categories', restaurantId],
		queryFn: () =>
			ProductService.getCategoriesForRestaurant(restaurantId).then(
				res => res.data.data as Array<IGet_Categories_For_Restaurant_Response>
			),
		enabled: !!restaurantId
	})

export const useProductByCategoryInRestaurantQuery = (
	restaurantId: string,
	categoryId: string
) =>
	useQuery({
		queryKey: ['products', restaurantId, categoryId],
		queryFn: () =>
			ProductService.getProductsByCategoryInRestaurant(
				restaurantId,
				categoryId
			).then(
				res =>
					res.data.data as IGet_Products_By_Category_For_Restaurant_Response
			),
		enabled: !!restaurantId
	})

export const useAllProductsForRestaurantQuery = (restaurantId: string) => {
	const { data: categoriesResponse, isSuccess: areCategoriesLoaded } =
		useCategoriesForRestaurantQuery(restaurantId)
	const categories = categoriesResponse

	const productQueries = useQueries({
		queries:
			areCategoriesLoaded && categories
				? categories.map(category => {
						return {
							queryKey: ['products', restaurantId, category.id],
							queryFn: () =>
								ProductService.getProductsByCategoryInRestaurant(
									restaurantId!,
									category.id
								).then(res => res.data.data.products),
							enabled: !!restaurantId
						}
				  })
				: []
	})

	const allProducts = productQueries.flatMap(query => query.data || [])
	const isLoading = productQueries.some(query => query.isLoading)
	const isError = productQueries.some(query => query.isError)
	const isSuccess = productQueries.every(query => query.isSuccess)

	return { data: allProducts, isLoading, isError, isSuccess }
}
