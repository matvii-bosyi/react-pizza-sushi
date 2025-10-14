import { useTopRestaurantsQuery, useAllProductsForRestaurantQuery } from '@/api'
import type { IProduct } from '@/api'
import RestaurantCard from '@/pages/restaurants/components/RestaurantCard'
import { Link } from 'react-router'

const RestaurantProducts = ({ restaurantId }: { restaurantId: string }) => {
	const {
		data: products,
		isLoading,
		isError
	} = useAllProductsForRestaurantQuery(restaurantId)

	if (isLoading) {
		return <div>Loading products...</div>
	}

	if (isError) {
		return <div>Error fetching products.</div>
	}

	return (
		<ul className='flex flex-row gap-[20px] overflow-x-scroll'>
			{products.map((product: IProduct) => (
				<li
					key={product.id}
					className='bg-white shadow-[0px_1px_19.4px_0px_rgba(196,203,211,0.25)] p-[20px] rounded-[32px] flex flex-col'>
					<div className='relative w-[181px] h-[181px]'>
						<img src={product.image} alt='' className='w-full h-full' />
						<div className='absolute bg-[#DD302C] rounded-[24px] py-[3px] px-[3px] text-white font-[600] top-[10.5px] left-[13px]'>-15%</div>
					</div>
					<div className='flex flex-col flex-1 justify-between gap-[10px]'>
						<Link to={`/product/${product.id}`} className='font-[700] text-[20px]'>{product.name}</Link>
						<div className='flex flex-col'>
							<span className='text-[#DD302C] text-[16px] leading-[100%] font-[500] line-through'>
								{Math.round(Number(product.price) * 1.15)} грн
							</span>{' '}
							<span className='space-x-[2px]'>
								<span className='font-[600] text-[22px]'>{product.price}</span>
								<span className='font-[500] text-[14px]'>грн</span>
							</span>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}

const TopThreeRestaurant = () => {
	const { data: topRestaurants, isLoading, isError } = useTopRestaurantsQuery()

	if (isLoading) {
		return <div>Loading top restaurants...</div>
	}

	if (isError) {
		return <div>Error fetching top restaurants.</div>
	}

	const topThreeRestaurants = topRestaurants?.slice(1, 4)

	return (
		<div className='space-y-[40px] max-w-full'>
			<h2>Заклади, які вам можуть сподобатись</h2>
			{topThreeRestaurants?.map(restaurant => (
				<div
					className='bg-white rounded-[51px] p-[26px] grid grid-cols-[424px_1fr] gap-[20px]'
					key={restaurant.id}>
					<RestaurantCard restaurant={restaurant} />
					<RestaurantProducts restaurantId={restaurant.id} />
				</div>
			))}
		</div>
	)
}

export default TopThreeRestaurant
