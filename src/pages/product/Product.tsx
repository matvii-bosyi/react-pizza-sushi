import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { useAllProductsForRestaurantQuery, useProductByIdQuery } from '@/api'
import {
	useBasketGetAllQuery,
	useBasketMutation,
	useClearBasketMutation
} from '@/api/basket'
import { BasketModalContext } from '@/context/BasketModalContext'
import { cn } from '@/lib/cn'
import useModal from '@/hooks/useModal'

import Button from '@/components/ui/Button'
import PlusIcon from '@/assets/icons/plus.svg?react'
import MinusIcon from '@/assets/icons/minus.svg?react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import ArrowBackIcon from '@/assets/icons/arrowBack.svg?react'
import FavoriteButton from '@/components/ui/FavoriteButton'
import ConfirmationModal from '@/features/confirmation-modal/ConfirmationModal'
import ProductCard from '@/components/ui/ProductCard'

const Product = () => {
	const { id } = useParams<{ id: string }>()
	const { data: product, isLoading, isError } = useProductByIdQuery(id!)

	const { data: basketItems } = useBasketGetAllQuery()
	const { mutate: basketAction } = useBasketMutation()
	const {
		mutate: clearBasket,
		isPending: isClearingBasket
	} = useClearBasketMutation()

	const { data: restaurantProducts, isLoading: areRestaurantProductsLoading } =
		useAllProductsForRestaurantQuery(product?.restaurantId ?? '')

	const basketModal = useContext(BasketModalContext)

	const [quantity, setQuantity] = useState(1)
	const confirmModal = useModal()

	const productInBasket = basketItems?.find(item => item.id === id)

	useEffect(() => {
		if (productInBasket) {
			setQuantity(productInBasket.quantityInBasket)
		} else {
			setQuantity(1)
		}
	}, [productInBasket, id])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError || !product) {
		return <div>Error loading product.</div>
	}

	const handleAddToCart = () => {
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
			basketAction(
				{
					productId: id!,
					quantity: newQuantity,
					restaurantId: product.restaurantId
				},
				{
					onSuccess: () => {
						basketModal?.onOpen()
					}
				}
			)
		}
	}

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
				productId: id!,
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
				productId: id!,
				quantity: newQuantity,
				restaurantId: product.restaurantId
			})
		}
	}

	const handleConfirmClearAndAdd = () => {
		clearBasket(undefined, {
			onSuccess: () => {
				basketAction(
					{
						productId: id!,
						quantity: 1,
						restaurantId: product.restaurantId
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

	const otherProducts = restaurantProducts?.filter(p => p.id !== product.id)

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
			<div className='container mx-auto py-10'>
				<div className='flex flex-row gap-[20px] justify-center'>
					<div className='max-w-[560px] flex flex-col gap-[20px]'>
						<div className='relative min-h-[300px]'>
							<img
								src={product.image}
								alt={product.name}
								className='w-full h-auto object-cover rounded-[32px]'
							/>
							<button
								onClick={() => window.history.back()}
								className='bg-white shadow-lg rounded-[14px] p-[10px] w-fit h-fit absolute top-[20px] left-[20px]'
							>
								<ArrowBackIcon />
							</button>
							<FavoriteButton
								productId={product.id}
								isFavorite={product.isFavorite}
								className={cn(
									'absolute top-[20px] right-[20px] shadow-lg'
								)}
							/>
						</div>
						<div
							className='flex flex-col gap-[16px] bg-white rounded-[20px] p-[20px]'
						>
							<div className='flex flex-col gap-2'>
								<span className='text-[14px] font-[500] text-[#535863]/60'>
									{product.weight} г
								</span>
								<div>
									<div className='flex flex-row justify-between'>
										<h1 className='text-[20px] font-[700]'>{product.name}</h1>
										<span className='text-[22px] font-[700] flex items-center'>
											{product.price}{' '}
											<span className='text-[14px] font-[500] flex-1 pl-[2px] py-[5px]'>
												грн
											</span>
										</span>
									</div>
								</div>
								<p className='text-[#535863]/60 text-[14px] font-[500]'>
									{product.description}
								</p>
							</div>
							<div className='flex items-center gap-[11px] justify-between'>
								<Button
									variant='green'
									onClick={handleAddToCart}
									className='flex-1'
								>
									У кошик
								</Button>
								{productInBasket && productInBasket.quantityInBasket > 0 ? (
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
										<button
											onClick={handleIncrement}
											className='text-[#049F83]'
										>
											<PlusIcon />
										</button>
									</div>
								) : (
									<button
										onClick={handleIncrement}
										className='rounded-full p-[10px] border-[2px] group border-[#049F83] text-[#049F83]'
									>
										<PlusIcon className='group-hover:rotate-90 duration-300 ' />
									</button>
								)}
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-[20px]'>
						<h2 className='text-[18px] font-[600]'>
							Інші товари з цього ресторану
						</h2>
						{areRestaurantProductsLoading ? (
							<div>Loading...</div>
						) : (
							<div className='flex flex-col gap-[10px]'>
								{otherProducts?.map(p => (
									<ProductCard key={p.id} product={p} variant='other' />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Product
