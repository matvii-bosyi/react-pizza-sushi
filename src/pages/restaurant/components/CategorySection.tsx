import { useProductByCategoryInRestaurantQuery } from '@/api'
import ProductCard from './ProductCard'

interface CategorySectionProps {
	restaurantId: string
	category: {
		id: string
		name: string
	}
}

const CategorySection = ({ restaurantId, category }: CategorySectionProps) => {
	const { data: productsResponse, isLoading, isError } = useProductByCategoryInRestaurantQuery(restaurantId, category.id)

	if (isLoading) return <div>Завантаження продуктів...</div>
	if (isError) return <div>Помилка завантаження продуктів.</div>

	const products = productsResponse?.products ?? []

	return (
		<div className='w-full'>
			<h2 className='text-3xl font-bold mb-6'>{category.name}</h2>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default CategorySection
