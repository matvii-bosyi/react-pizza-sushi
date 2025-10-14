import { useRestaurantsQuery } from '@/api'
import ArrowBackIcon from '@/assets/icons/arrowBack.svg?react'
import RestaurantCard from './components/RestaurantCard'

const Restaurants = () => {
	const { data } = useRestaurantsQuery()
	console.log(data)
	
	const restaurants = data?.restaurants

	return (
		<div className='mt-[40px] w-full space-y-[40px]'>
			<div className='flex gap-[10px]'>
				<button
					onClick={() => window.history.back()}
					className='bg-white rounded-[14px] p-[10px] w-fit h-fit'>
					<ArrowBackIcon />
				</button>
				<h2>Заклади</h2>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center'>
				{restaurants?.map(restaurant => (
					<RestaurantCard restaurant={restaurant} key={restaurant.id} />
				))}
			</div>
		</div>
	)
}

export default Restaurants
