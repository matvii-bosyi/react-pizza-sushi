import type { IUseModalProps } from '@/hooks/useModal'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import ModalLayout from './ModalLayout'
import ModalTitle from './ModalTitle'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

interface IModalComponentProps extends PropsWithChildren<IUseModalProps> {
	className?: string
	style?: CSSProperties
	position?: 'center' | 'right' | 'left'
}

const ModalComponent: FC<IModalComponentProps> = ({
	children,
	...layoutProps
}) => {
	return <ModalLayout {...layoutProps}>{children}</ModalLayout>
}

const Modal = Object.assign(ModalComponent, {
	Title: ModalTitle,
	Body: ModalBody,
	Footer: ModalFooter
})

export default Modal
