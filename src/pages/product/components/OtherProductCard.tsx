import { Link } from 'react-router'
import { useBasketGetAllQuery, useBasketMutation, type IGet_Product_By_Id_Response } from '@/api'
import FavoriteButton from '@/components/ui/FavoriteButton'
import PlusIcon from '@/assets/icons/plus.svg?react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import MinusIcon from '@/assets/icons/minus.svg?react'
import useModal from '@/hooks/useModal'
import { useEffect, useState } from 'react'

interface OtherProductCardProps {
	product: IGet_Product_By_Id_Response
}

const OtherProductCard = ({ product }: OtherProductCardProps) => {
	const { data: basketItems } = useBasketGetAllQuery()

	const { mutate: basketAction } = useBasketMutation()
	const [quantity, setQuantity] = useState(1)
	const productInBasket = basketItems?.find(item => item.id === product.id)

	const confirmModal = useModal()

	useEffect(() => {
		if (productInBasket) {
			setQuantity(productInBasket.quantityInBasket)
		} else {
			setQuantity(1)
		}
	}, [productInBasket])

	const handleIncrement = () => {
		const currentRestaurantId = basketItems?.[0]?.restaurantId
		if (
			basketItems &&
			basketItems.length > 0 &&
			currentRestaurantId !== product.restaurantId
		) {
			confirmModal.onOpen()
		} else {
			const newQuantity = (productInBasket?.quantityInBasket ?? 0) + 1
			setQuantity(newQuantity)
			basketAction({
				productId: product.id!,
				quantity: newQuantity,
				restaurantId: product.restaurantId
			})
		}
	}

	const handleDecrement = () => {
		if (product && productInBasket) {
			const newQuantity = productInBasket.quantityInBasket - 1
			setQuantity(newQuantity)
			basketAction({
				productId: product.id!,
				quantity: newQuantity,
				restaurantId: product.restaurantId
			})
		}
	}

	return (
			<div className='bg-white rounded-[36px] p-[14px] w-[360px] h-[181px] flex flex-row gap-[20px]'>
				<Link to={`/product/${product.id}`} className='relative w-[50%] aspect-square'>
					<img src={product.image} alt={product.name} className='w-full h-full object-cover rounded-lg' />
					<div className='absolute top-0 left-0'>
						<FavoriteButton className='scale-[0.8]' productId={product.id} isFavorite={product.isFavorite} />
					</div>
				</Link>
				<div className='flex flex-col justify-between w-full'>
					<div className='flex flex-col gap-[3px]'>
						<span className='text-[14px] font-[500] leading-[17px] text-[#535863]/60'>
							{product.weight} г
						</span>
						<h3 className='font-[700] text-[16px] leading-[20px]'>{product.name}</h3>
						<p className='text-[#535863]/60 line-clamp-2 font-[500] text-[14px] leading-[16px] flex-1'>{product.description}</p>
					</div>
					<div className='flex justify-between items-center'>
							<span className='space-x-[2px]'>
								<span className='font-[600] text-[16px]'>{product.price}</span>
								<span className='font-[500] text-[14px]'>грн</span>
							</span>
							{product.quantityInBasket && product.quantityInBasket > 0 ? (
								<div className='flex items-center gap-[3px] border-[2px] rounded-[30px] border-[#049F83] py-[4px] px-[8px]'>
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
							) : (
								<button
									onClick={handleIncrement}
									className='rounded-full p-[10px] border-[2px] group border-[#049F83] text-[#049F83]'>
									<PlusIcon className='group-hover:rotate-90 duration-300 ' />
								</button>
							)}
					</div>
				</div>
			</div>
	)
}

export default OtherProductCard
