import type { FC } from 'react'
import type { IUseModalProps } from '@/hooks/useModal'
import Modal from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button'

interface IConfirmationModalProps extends IUseModalProps {
	onConfirm: () => void
	title: string
	description?: string
	confirmText?: string
	cancelText?: string
	isPending?: boolean
}

const ConfirmationModal: FC<IConfirmationModalProps> = ({
	onConfirm,
	title,
	description,
	confirmText = 'Видалити',
	cancelText = 'Скасувати',
	isPending = false,
	...props
}) => {
	return (
		<Modal
			{...props}
			className='mx-auto h-fit w-[440px] max-w-md flex flex-col overflow-hidden rounded-[32px] bg-[#F3F3F3] p-5 text-black shadow-xl backdrop-blur-xl'
		>
			<Modal.Title onClose={props.onClose}>{title}</Modal.Title>
			<Modal.Body className='flex flex-col flex-1 pt-4'>
				{description && (
					<p className='text-sm text-center text-gray-500'>{description}</p>
				)}
				<div className='flex justify-end gap-x-4 mt-auto pt-4'>
					<Button variant='gray' onClick={props.onClose} disabled={isPending}>
						{cancelText}
					</Button>
					<Button variant='red' onClick={onConfirm} disabled={isPending}>
						{isPending ? 'Видалення...' : confirmText}
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default ConfirmationModal
