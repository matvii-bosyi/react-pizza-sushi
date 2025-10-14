import { useEffect, useState } from 'react'
import { useBasketMutation, type IBasketGetAll_Response } from '@/api'

import TrashIcon from '@/assets/icons/trash.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'
import MinusIcon from '@/assets/icons/minus.svg?react'

const ProductCard = ({ product }: { product: IBasketGetAll_Response }) => {
	const [quantity, setQuantity] = useState(1)
	const { mutate: basketAction } = useBasketMutation()

	useEffect(() => {
		if (product) {
			setQuantity(product.quantityInBasket)
		}
	}, [product])

	const handleIncrement = () => {
		if (product) {
			const newQuantity = (product?.quantityInBasket ?? 0) + 1
			setQuantity(newQuantity)
			basketAction({
				productId: product.id!,
				quantity: newQuantity,
				restaurantId: product.restaurantId
			})
		}
	}

	const handleDecrement = () => {
		if (product && product.quantityInBasket) {
			const newQuantity = product.quantityInBasket - 1
			setQuantity(newQuantity)
			basketAction({
				productId: product.id!,
				quantity: newQuantity,
				restaurantId: product.restaurantId
			})
		}
	}

	const handleRemove = () => {
		if (product) {
			basketAction({
				productId: product.id!,
				quantity: 0,
				restaurantId: product.restaurantId
			})
		}
	}

	return (
		<div className='bg-white rounded-[26px] p-[16px] flex flex-col gap-[16px]'>
			<div className='flex flex-row gap-[16px]'>
				<div className='max-w-[90px] max-h-[90px]'>
					<img src={product.image} alt='product' className='w-full h-full' />
				</div>
				<div className='flex-1 space-y-[6px]'>
					<div className='flex justify-between'>
						<p className='font-[700] max-w-[200px]'>{product.name}</p>
						<button onClick={handleRemove} className='cursor-pointer'>
							<TrashIcon className='text-[#535863]/50' />
						</button>
					</div>
					<p className='font-[500] text-[14px] text-[#535863]/70'>
						{product.weight} г
					</p>
				</div>
			</div>
			<div className='h-[1px] bg-[#535863]/10 w-full' />
			<div className='flex justify-between items-center'>
				<span className='text-[20px] font-[600] flex items-center'>
					{product.price}{' '}
					<span className='text-[14px] font-[500] flex-1 pl-[4px] py-[5px]'>
						грн
					</span>
				</span>

				<div className='flex items-center gap-[3px] border-[2px] rounded-[30px] border-[#DDE0E2] py-[4px] px-[8px]'>
					<button onClick={handleDecrement}>
						{quantity === 1 ? (
							<TrashIcon className='text-[#535863]/50' />
						) : (
							<MinusIcon />
						)}
					</button>
					<span className='font-[600] leading-[32px] w-[25px] text-center'>
						{quantity}
					</span>
					<button onClick={handleIncrement} className='text-[#049F83]'>
						<PlusIcon />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
