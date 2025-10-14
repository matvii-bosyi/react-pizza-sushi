import type { IGet_All_Restaurants_Response } from '@/api'
import ScooterIcon from '@/assets/icons/scooter.svg?react'
import StartsIcon from '@/assets/icons/stars.svg?react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import FavoriteButton from '@/components/ui/FavoriteButton'

const RestaurantCard = ({
	restaurant
}: {
	restaurant: IGet_All_Restaurants_Response['restaurants'][number]
}) => {
	return (
		<div className='bg-white rounded-[32px] w-[424px] flex flex-col'>
			<div className='relative w-full h-[220px]'>
				<img
					src={restaurant.banner}
					alt='restaurant banner'
					className='w-full h-full rounded-[32px]'
				/>
				<FavoriteButton
					restaurantId={restaurant.id}
					isFavorite={restaurant.isFavorite}
					className={cn(
						'absolute top-5 right-5',
						restaurant.isFavorite ? '' : 'opacity-80 backdrop-blur-[10px]'
					)}
				/>
				<div className='absolute bottom-5 right-5 rounded-[38px] bg-white py-[5px] px-[10px] text-[#DD302C] flex items-center gap-1'>
					<StartsIcon />
					<span className='text-[14px] font-[700]'>
						{restaurant.rating + '%'}
					</span>
					<span className='text-[#181818] opacity-50 font-[500]'>
						({Math.floor(Math.random() * 98) + 3}+)
					</span>
				</div>
			</div>
			<div className='p-[18px] flex flex-col gap-[6px]'>
				<Link
					to={`/restaurants/${restaurant.id}`}
					className='text-[20px] font-[700]'>
					{restaurant.name}
				</Link>
				<div className='flex items-center gap-[8px]'>
					<span className='flex items-center gap-[3px] rounded-[24px] bg-[#FFEDBA] px-[7px] text-[#CC6821]'>
						<ScooterIcon />
						<span className='font-[600]'>
							{restaurant.deliveryPrice
								? restaurant.deliveryPrice + ' грн'
								: 'Безкоштовно'}
						</span>
					</span>
					<span className='text-[14px] font-[600] text-[#88898B]'>
						{restaurant.cookingTime}-{restaurant.cookingTime + 10} хв
					</span>
				</div>
			</div>
		</div>
	)
}

export default RestaurantCard
