import { useEffect, useState, type Dispatch, type SetStateAction, useCallback } from 'react'

type TModalAnimation = 'in' | 'out'

export interface IUseModalProps {
	isOpen: boolean
	onOpen: (value?: string | number | object) => void
	onClose: () => void
	animation: TModalAnimation
	stateModal: string | number | object
	successMessage?: string | null
	setSuccessMessage?: Dispatch<SetStateAction<string | null>>
	isUpdate: boolean
}

const useModal = (isScroll: boolean = false): IUseModalProps => {
	const [isOpen, setIsOpen] = useState(false)
	const [animation, setAnimation] = useState<TModalAnimation>('in')
	const [stateModal, setStateModal] = useState<string | number | object>('')
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const [isUpdate, setIsUpdate] = useState<number>(0)

	useEffect(() => {
		if (!isScroll) {
			document.body.style.overflow = isOpen ? 'hidden' : 'auto'
		}
	}, [isOpen, isScroll])

	const handleOpen = (value: string | number | object = '') => {
		setIsOpen(true)
		setAnimation('in')
		setStateModal(value)
		setSuccessMessage(null)
		setIsUpdate((prev) => prev + 1)
	}

	const handleClose = useCallback(() => {
		setAnimation('out')
		setTimeout(() => {
			setIsOpen(false)
			setStateModal('')
		}, 300)
	}, [])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				handleClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, handleClose])
	
	return {
		isOpen,
		onOpen: handleOpen,
		onClose: handleClose,
		animation,
		stateModal,
		successMessage,
		setSuccessMessage,
		isUpdate: Boolean(isUpdate % 2),
	}
}

export default useModal