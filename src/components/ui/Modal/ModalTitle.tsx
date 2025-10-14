import { cn } from '@/lib/cn'
import CrossIcon from '@/assets/icons/cross.svg?react'
import type { ComponentProps, FC } from 'react'

interface ModalTitleProps extends ComponentProps<'div'> {
	onClose?: () => void
}

const ModalTitle: FC<ModalTitleProps> = ({
	children,
	className,
	onClose,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row flex-nowrap justify-between font-medium items-center text-lg gap-5',
				className
			)}>
			<div className='text-[18px]'>{children}</div>
			{onClose && (
				<button
					onClick={onClose}
					className='w-[44px] h-[44px] flex items-center justify-center rounded-[15px] hover:border-black bg-[#FFF] hover:border-[2px] cursor-pointer duration-200 shrink-0'
					type={'reset'}>
					<CrossIcon className='scale-[1.3]'/>
				</button>
			)}
		</div>
	)
}

export default ModalTitle
