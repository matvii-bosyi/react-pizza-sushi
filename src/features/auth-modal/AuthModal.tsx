import type { FC } from 'react'
import { useState } from 'react'

import type { IUseModalProps } from '@/hooks/useModal'
import Modal from '@/components/ui/Modal/Modal'
import PhoneStep from './components/PhoneStep'
import OtpStep from './components/OtpStep'
import NameStep from './components/NameStep'

const AuthModal: FC<IUseModalProps> = props => {
	const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone')
	const [phoneNumber, setPhoneNumber] = useState<string | null>(null)

	const renderStep = () => {
		switch (step) {
			case 'phone':
				return (
					<PhoneStep
						onSubmitSuccess={phone => {
							setPhoneNumber(phone)
							setStep('otp')
						}}
					/>
				)
			case 'otp':
				return (
					phoneNumber && (
						<OtpStep
							phone={phoneNumber}
							onSubmitSuccess={() => {
								setStep('name')
							}}
						/>
					)
				)
			case 'name':
				return (
					phoneNumber && (
						<NameStep
							phone={phoneNumber}
							onSubmitSuccess={() => {
								props.onClose()
							}}
						/>
					)
				)
			default:
				return null
		}
	}

	return (
		<Modal
			{...props}
			className={
				'mx-auto h-fit w-[440px] max-w-md flex-col overflow-hidden rounded-[32px] bg-[#F3F3F3] p-5 text-black shadow-xl backdrop-blur-xl'
			}
		>
			<Modal.Title onClose={props.onClose}>Вхід</Modal.Title>
			<Modal.Body className='flex flex-col pt-[40px]'>{renderStep()}</Modal.Body>
		</Modal>
	)
}

export default AuthModal