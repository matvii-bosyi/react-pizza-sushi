import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IMaskInput } from 'react-imask'

import { phoneSchema, type PhoneFormValues } from '../lib/schemas'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

import { useRequestOtpMutation } from '@/api'

const PhoneStep: FC<{ onSubmitSuccess: (phone: string) => void }> = ({
	onSubmitSuccess,
}) => {
	const { control, handleSubmit } = useForm<{ phone: string }>({
		resolver: zodResolver(phoneSchema),
		mode: 'onBlur',
	})

	const { mutate, isPending } = useRequestOtpMutation()

	const onSubmit = (data: PhoneFormValues) => {
		mutate(
			{ phone: data.phone },
			{
				onSuccess: () => {
					onSubmitSuccess(data.phone)
				},
			}
		)
	}

	return (
		<>
			<h3 className='text-center text-[20px] font-[700]'>Ласкаво просимо</h3>
			<p className='text-center font-[500] text-[#88898B]'>
				Увійти по номеру телефону
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-[24px] flex flex-col gap-[14px]'
			>
				<label
					className='ml-[14px] text-[14px] font-[600] text-[#535863]'
					htmlFor='phone'
				>
					Мобільний телефон
				</label>
				<Controller
					name="phone"
					control={control}
					defaultValue=""
					render={({ field, fieldState }) => (
						<div>
							<IMaskInput
								{...field}
								mask="+{38} (000) 000-00-00"
								placeholder='+38 (___) ___-__-__'
								id="phone"
								className={cn(
									'w-full py-[13.5px] px-[14px] rounded-[24px] bg-white border-none text-[16px] font-[500] leading-[17px]',
									fieldState.error && 'ring-1 ring-red-500'
								)}
							/>
							{fieldState.error && (
								<p className="mt-1 text-sm text-red-600">
									{fieldState.error.message}
								</p>
							)}
						</div>
					)}
				/>
				<Button type='submit' variant='green' disabled={isPending}>
					{isPending ? 'Зачекайте...' : 'Продовжити'}
				</Button>
			</form>
		</>
	)
}

export default PhoneStep
