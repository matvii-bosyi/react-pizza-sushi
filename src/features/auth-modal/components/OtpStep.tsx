import type { FC } from 'react'
import { useState, useRef, useEffect } from 'react'
import {
	useVerifyOtpMutation,
	useRequestOtpMutation
} from '@/api'
import { formatPhone } from '@/lib/formatPhone'

const OtpStep: FC<{ phone: string; onSubmitSuccess: () => void }> = ({
	phone,
	onSubmitSuccess
}) => {
	const [otp, setOtp] = useState(new Array(4).fill(''))
	const [timer, setTimer] = useState(120)
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])

	const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtpMutation()
	const { mutate: requestOtp, isPending: isResending } = useRequestOtpMutation()

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = e.target
		if (/[^0-9]/.test(value)) return

		const newOtp = [...otp]
		newOtp[index] = value.slice(-1)
		setOtp(newOtp)

		if (value && index < 3) {
			inputsRef.current[index + 1]?.focus()
		}

		if (newOtp.every(digit => digit !== '')) {
			verifyOtp(
				{ phone, code: newOtp.join('') },
				{
					onSuccess: () => {
						onSubmitSuccess()
					}
				}
			)
		}
	}

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}

	const handleResend = () => {
		requestOtp(
			{ phone },
			{
				onSuccess: () => {
					setTimer(120)
				}
			}
		)
	}

	const minutes = Math.floor(timer / 60)
	const seconds = timer % 60

	return (
		<>
			<h3 className='text-center text-[20px] leading-[24px] font-[700]'>
				Код підтвердження
			</h3>
			<p className='text-center mt-[20px] text-[16px] font-[500] leading-[24px] text-[#535863]'>
				На{' '}
				<span className='text-[#181818] font-[700]'>{formatPhone(phone)}</span>{' '}
				був
				<br />
				надісланий код для підтвердження
			</p>
			<div className='mt-[24px] flex flex-col gap-[14px]'>
				<div className='flex justify-center gap-[14px]'>
					{otp.map((digit, index) => (
						<input
							key={index}
							ref={el => {
								inputsRef.current[index] = el
							}}
							type='text'
							value={digit}
							onChange={e => handleInputChange(e, index)}
							onKeyDown={e => handleKeyDown(e, index)}
							className='w-[44px] h-[44px] text-center text-[16px] leading-[17px] font-[500] rounded-[12px] bg-white border-none'
							disabled={isVerifying}
						/>
					))}
				</div>
				{isVerifying && (
					<p className='text-center text-sm text-gray-500 mt-4'>
						Перевірка коду...
					</p>
				)}
				<div className='text-center text-[14px] font-[500] text-[#535863] mt-4 mb-[30px]'>
					{timer > 0 ? (
						<p>
							Відправити код повторно: {' '}
							<span className='font-[600] text-[#181818]'>
								через {minutes}:{seconds < 10 ? `0${seconds}` : seconds} хв
							</span>
						</p>
					) : (
						<button
							onClick={handleResend}
							className='text-[#181818] font-[700] hover:underline'
							disabled={isResending}>
							{isResending ? 'Надсилаємо...' : 'Відправити повторно'}
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default OtpStep
