import { useTopCategoriesQuery } from '@/api/categories'

const TopCategories = () => {
	const { data } = useTopCategoriesQuery()

	return (
		<div className='space-y-[40px]'>
			<h2>Популярні категорії</h2>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center items-center'>
				{data &&
					data.map(category => (
						<div
							key={category.id}
							className='bg-white rounded-[24px] h-[110px] w-full flex flex-col justify-center items-center gap-[10px] border-[3px] border-transparent duration-300 hover:border-3px hover:border-[#DD302C] shadow-md'
						>
							<img
								src={category.imageUrl}
								alt={category.name}
								className='w-10 h-10'
								style={{
									filter:
										'invert(35%) sepia(83%) saturate(3356%) hue-rotate(-5deg) brightness(97%) contrast(106%)'
								}}
							/>
							<p className='font-[700]'>{category.name}</p>
						</div>
					))}
			</div>
		</div>
	)
}

export default TopCategories
