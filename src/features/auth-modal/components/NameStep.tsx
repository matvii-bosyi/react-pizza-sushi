import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { nameSchema, type NameFormValues } from '../lib/schemas'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useFinalizeOtpMutation } from '@/api'
import { useAuth } from '@/hooks/useAuth'

const NameStep: FC<{ phone: string; onSubmitSuccess: () => void }> = ({
	phone,
	onSubmitSuccess
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NameFormValues>({
		resolver: zodResolver(nameSchema)
	})

	const { mutate, isPending } = useFinalizeOtpMutation()
	const { setAuth } = useAuth()

	const onSubmit = (data: NameFormValues) => {
		mutate(
			{ ...data, phone },
			{
				onSuccess: () => {
					setAuth(true)
					onSubmitSuccess()
				}
			}
		)
	}

	return (
		<>
			<h3 className="text-center text-[20px] font-[700]">
				Як до вас звертатись?
			</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-[24px] flex flex-col gap-[14px]"
			>
				<Input
					label="Ім'я"
					{...register('firstName')}
					error={errors.firstName?.message}
					className="bg-white rounded-xl border-none"
				/>
				<Input
					label="Прізвище"
					{...register('lastName')}
					error={errors.lastName?.message}
					className="bg-white rounded-xl border-none"
				/>
				<Button type="submit" variant="green" disabled={isPending}>
					{isPending ? 'Збереження...' : 'Зберегти'}
				</Button>
			</form>
		</>
	)
}

export default NameStep
