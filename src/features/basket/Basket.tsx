import Modal from '@/components/ui/Modal/Modal'
import type { IUseModalProps } from '@/hooks/useModal'
import { useBasketGetAllQuery } from '@/api/basket'
import ProductCard from './components/ProductCard'
import Button from '@/components/ui/Button'

type IBasketProps = IUseModalProps

const Basket = (props: IBasketProps) => {
	const { data: basketItems, isLoading, isError } = useBasketGetAllQuery()

	const total =
		basketItems?.reduce(
			(acc, item) => acc + item.price * item.quantityInBasket,
			0
		) ?? 0

	const freeDeliveryThreshold = 1500;
	const amountLeft = Math.max(0, freeDeliveryThreshold - total);
	const progress = Math.min((total / freeDeliveryThreshold) * 100, 100);

	return (
		<Modal
			{...props}
			position='right'
			className='bg-[#F3F3F3] flex flex-col max-w-[420px] w-[420px]'>
			<Modal.Title onClose={props.onClose} className='py-[11px] px-[14px]'>Кошик</Modal.Title>
			<Modal.Body className='flex-1 pt-[10px] px-[14px]'>
				{isLoading && <p>Loading...</p>}
				{isError && <p>Error loading basket.</p>}
				{basketItems && basketItems.length > 0 ? (
					<div className='flex flex-col w-full gap-[10px]'>
						{basketItems.map(item => (
							<ProductCard key={item.id} product={item} />
						))}
					</div>
				) : (
					<p>Ваш кошик пустий</p>
				)}
			</Modal.Body>
			<Modal.Footer className='bg-white flex flex-col gap-[20px] pt-[14px] pb-[20px] px-[14px]'>
				<div>
					<p className='text-[#535863] font-[600] text-[13px] leading-[20px] text-center'>
						{amountLeft > 0 ? `До безкоштовної доставки: ` : 'У вас безкоштовна доставка!'}
						{amountLeft > 0 && <span className='font-[500]'>{amountLeft} грн</span>}
					</p>
                    <div className="bg-[#DDE0E2] rounded-[20px] h-[8px] mt-2">
						<div
							className="bg-[#049F83] rounded-[32px] h-full"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
				<div className='flex flex-row justify-between leading-[145%]'>
					<p className='text-[#535863] font-[600]'>До сплати:</p>
					<p className='font-[600] leading-[145%]'>
						{total} <span className='text-[14px] font-[500]'>грн</span>
					</p>
				</div>
				<Button variant='green' className='text-[15px] leading-[20px]'>
					Оформити замовлення
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default Basket
