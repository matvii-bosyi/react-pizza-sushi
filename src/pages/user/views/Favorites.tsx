import { useState } from 'react'
import { useFavoritesQuery } from '@/api'
import { cn } from '@/lib/cn'
import RestaurantCard from '@/pages/restaurants/components/RestaurantCard'
import ProductCard from './components/ProductCard'

const Favorites = () => {
	const { data } = useFavoritesQuery()
	const products = data?.products
	const restaurants = data?.restaurants
	const [activeTab, setActiveTab] = useState<'restaurants' | 'products'>(
		'restaurants'
	)

	const activeClass =
		'text-[#DD302C] font-[600] leading-[17px] pb-[20px] border-b-[3px] border-[#DD302C]'
	const inactiveClass =
		'text-[#181818]/60 font-[600] leading-[17px] pb-[22px] border-b-[1px] opacity-60'

	return (
		<div className='flex flex-col gap-[20px]'>
			<h3 className='text-[22px] font-[700]'>Збережене</h3>
			<div>
				<button
					className={cn(
						'w-[50%]',
						activeTab === 'restaurants' ? activeClass : inactiveClass
					)}
					onClick={() => setActiveTab('restaurants')}
				>
					Заклади
				</button>
				<button
					className={cn(
						'w-[50%]',
						activeTab === 'products' ? activeClass : inactiveClass
					)}
					onClick={() => setActiveTab('products')}
				>
					Їжа
				</button>
			</div>
			<div>
				{activeTab === 'restaurants' && (
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 justify-items-center'>
						{restaurants?.map(restaurant => (
							<RestaurantCard restaurant={restaurant} key={restaurant.id} />
						))}
					</div>
				)}
				{activeTab === 'products' && (
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 justify-items-center'>
						{products?.map(product => (
							<ProductCard product={product} key={product.id} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Favorites
