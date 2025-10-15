import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { type IGet_Products_By_Category_For_Restaurant_Response, useBasketGetAllQuery, useBasketMutation, useClearBasketMutation } from '@/api'
import useModal from '@/hooks/useModal'
import { BasketModalContext } from '@/context/BasketModalContext'
import PlusIcon from '@/assets/icons/plus.svg?react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import MinusIcon from '@/assets/icons/minus.svg?react'
import FavoriteButton from '@/components/ui/FavoriteButton'
import ConfirmationModal from '@/features/confirmation-modal/ConfirmationModal'
import { cn } from '@/lib/cn'
import type { IProduct } from '@/api/favorite/favorite.types'

type Product = IGet_Products_By_Category_For_Restaurant_Response['products'][0] | IProduct

interface ProductCardProps {
	product: Product
	variant: 'restaurant' | 'basket' | 'other' | 'favorite'
	restaurantId?: string
}

const ProductCard = ({ product, variant, restaurantId }: ProductCardProps) => {
	const { data: basketItems } = useBasketGetAllQuery()
	const { mutate: basketAction } = useBasketMutation()
	const { mutate: clearBasket, isPending: isClearingBasket } = useClearBasketMutation()
	const basketModal = useContext(BasketModalContext)
	const confirmModal = useModal()

	const restId = restaurantId ? restaurantId : (product as any).restaurantId ? (product as any).restaurantId : (product as any).restaurantsId


	const [quantity, setQuantity] = useState(1)
	const productInBasket = basketItems?.find(item => item.id === product.id)

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
			currentRestaurantId !== restId
		) {
			confirmModal.onOpen()
		} else {
			const newQuantity = (productInBasket?.quantityInBasket ?? 0) + 1
			setQuantity(newQuantity)
			basketAction({
				productId: product.id!,
				quantity: newQuantity,
				restaurantId: restId
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
				restaurantId: restId
			})
		}
	}

	const handleRemove = () => {
		if (product) {
			basketAction({
				productId: product.id!,
				quantity: 0,
				restaurantId: restId
			})
		}
	}

	const handleConfirmClearAndAdd = () => {
		clearBasket(undefined, {
			onSuccess: () => {
				basketAction(
					{
						productId: product.id,
						quantity: 1,
						restaurantId: restId
					},
					{
						onSuccess: () => {
							confirmModal.onClose()
							basketModal?.onOpen()
						}
					}
				)
			}
		})
	}

	if (variant === 'favorite') {
		return (
			<div className='bg-white rounded-[36px] p-[20px] w-[650px] h-[260px] flex flex-row gap-[20px]'>
				<Link to={`/product/${product.id}`} className='relative w-[220px] h-[220px]'>
					<img src={product.image} alt={product.name} className='w-full h-full object-cover rounded-lg' />
					<div className='absolute top-0 left-0'>
						<FavoriteButton productId={product.id} isFavorite={product.isFavorite} />
					</div>
				</Link>
				<div className='flex flex-col justify-between w-full'>
					<div className='flex flex-col gap-2'>
						<span className='text-[14px] font-[500] text-[#535863]/60'>
							{product.weight} г
						</span>
						<h3 className='font-[700] text-[20px]'>{product.name}</h3>
						<p className='text-gray-500 text-sm flex-1'>{product.description}</p>
					</div>
					<div className='flex justify-between items-center mt-4'>
							<span className='space-x-[2px] flex items-end'>
								<span className='font-[600] text-[22px]'>{product.price}</span>
								<span className='font-[500] text-[14px] py-[5px]'>грн</span>
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

	if (variant === 'other') {
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

	if (variant === 'basket') {
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

	return (
		<>
			<ConfirmationModal
				{...confirmModal}
				onConfirm={handleConfirmClearAndAdd}
				isPending={isClearingBasket}
				title='Очистити кошик?'
				description='Ви можете замовляти товари тільки з одного ресторану за раз.'
				confirmText='Очистити'
			/>
			<div className={cn('bg-white rounded-[36px] p-[20px] flex flex-row gap-[20px]', {
				'w-[650px] h-[335px]': variant === 'restaurant',
			})}>
				<Link to={`/product/${product.id}`} className='relative w-[50%] aspect-square'>
					<img src={product.image} alt={product.name} className='w-full h-full object-cover rounded-lg' />
					<div className='absolute top-0 left-0'>
						<FavoriteButton productId={product.id} isFavorite={product.isFavorite} />
					</div>
				</Link>
				<div className='flex flex-col justify-between w-full'>
					<div className='flex flex-col gap-2'>
						<span className='text-[14px] font-[500] text-[#535863]/60'>
							{product.weight} г
						</span>
						<h3 className='font-[700] text-[20px]'>{product.name}</h3>
						<p className='text-gray-500 text-sm flex-1'>{product.description}</p>
					</div>
					<div className='flex justify-between items-center mt-4'>
							<span className='space-x-[2px] flex items-end'>
								<span className='font-[600] text-[22px]'>{product.price}</span>
								<span className='font-[500] text-[14px] py-[5px]'>грн</span>
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
		</>
	)
}

export default ProductCard
