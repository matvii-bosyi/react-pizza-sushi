import { useParams } from 'react-router'
import { useRestaurantByIdQuery, useCategoriesForRestaurantQuery } from '@/api'
import { useRef, useState, useEffect } from 'react'
import ScooterIcon from '@/assets/icons/scooter.svg?react'
import StartsIcon from '@/assets/icons/stars.svg?react'
import ClockIcon from '@/assets/icons/clock.svg?react'
import ArrowBackIcon from '@/assets/icons/arrowBack.svg?react'
import { Link } from 'react-router'
import { AppRoutes } from '@/config/routes'
import CategorySection from './components/CategorySection'
import { cn } from '@/lib/cn'

const Restaurant = () => {
	const { id } = useParams<{ id: string }>()
	const {
		data: restaurant,
		isLoading: isLoadingRestaurant
	} = useRestaurantByIdQuery(id!)
	const {
		data: categories,
		isLoading: isLoadingCategories
	} = useCategoriesForRestaurantQuery(id!)

	const [activeCategory, setActiveCategory] = useState<string | null>(null)
	const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

	useEffect(() => {
		if (categories && categories.length > 0) {
			setActiveCategory(categories[0].id)
		}
	}, [categories])

	const handleNavClick = (categoryId: string) => {
		setActiveCategory(categoryId)
		categoryRefs.current[categoryId]?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	}

	if (isLoadingRestaurant) {
		return <div>Loading...</div>
	}

	if (!restaurant) {
		return <div>Restaurant not found</div>
	}

	const activeClass =
		'text-[#DD302C] font-[600] leading-[17px] pb-[20px] border-b-[3px] border-[#DD302C]'
	const inactiveClass =
		'text-[#181818]/60 font-[600] leading-[17px] pb-[22px] border-b-[1px] opacity-100 hover:text-[#DD302C] hover:border-[#DD302C] duration-300'

	return (
		<div className='mt-5 sm:mt-[40px] w-full space-y-5 sm:space-y-[40px]'>
			<div className='relative w-full h-[200px] sm:h-[300px]'>
				<img
					src={restaurant.banner}
					alt={restaurant.name}
					className='w-full h-full object-cover rounded-b-2xl sm:rounded-[32px]'
				/>
				<div className='absolute top-5 left-5'>
					<Link to={AppRoutes.RESTAURANTS}>
						<button className='bg-white rounded-[14px] p-[10px] w-fit h-fit'>
							<ArrowBackIcon />
						</button>
					</Link>
				</div>
			</div>

			<div className='flex flex-col gap-[20px] sm:gap-[40px] px-5 sm:px-[60px] bg-white rounded-[40px]'>
				<div className='flex flex-col items-center gap-4 lg:flex-row lg:justify-between py-5 sm:py-[40px]'>
					<div className='flex flex-row items-center gap-[20px]'>
						<img
							src={restaurant.logo}
							alt=''
							className='shadow-md border w-[80px] h-[80px] rounded-[16px]'
						/>
						<h1 className='text-[22px] font-[700]'>{restaurant.name}</h1>
					</div>
					<div className='flex items-center gap-x-4 sm:gap-x-8 justify-between'>
						<div className='flex flex-col items-center gap-1'>
							<div className='p-[7px] bg-[#FFEDBA] rounded-full'>
								<StartsIcon className='text-[#CC6821]' />
							</div>
							<span className='text-[14px] font-[500]'>{restaurant.rating}%</span>
						</div>

						<div className='flex flex-col items-center gap-1'>
							<div className='p-[7px] bg-[#FFEDBA] rounded-full'>
								<ScooterIcon className='text-[#CC6821]' />
							</div>
							<span className='text-[14px] font-[500]'>{restaurant.deliveryPrice} грн</span>
						</div>

						<div className='flex flex-col items-center gap-1'>
							<div className='p-[7px] bg-[#FFEDBA] rounded-full'>
								<ClockIcon className='text-[#CC6821]' />
							</div>
							<span className='text-[14px] font-[500]'>{restaurant.cookingTime} хв</span>
						</div>
					</div>
				</div>

				<div className='w-full flex-1'>
					<div className='flex items-center overflow-x-auto'>
						{isLoadingCategories ? (
							<div>Завантаження категорій...</div>
						) : (
							categories?.map(category => (
								<button
									key={category.id}
									onClick={() => handleNavClick(category.id)}
									className={cn(
										'whitespace-nowrap flex-1 px-4',
										activeCategory === category.id ? activeClass : inactiveClass
									)}
								>
									{category.name}
								</button>
							))
						)}
					</div>
				</div>
			</div>

			<div className='space-y-12 px-5 sm:px-0'>
				{categories?.map(category => (
					<div
						key={category.id}
						ref={el => {
							categoryRefs.current[category.id] = el
						}}
					>
						<CategorySection restaurantId={id!} category={category} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Restaurant
