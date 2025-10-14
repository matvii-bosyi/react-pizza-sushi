import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import type { IUseModalProps } from '@/hooks/useModal'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useUpdateUserProfile } from '@/api'
import type { IGet_User_Info_Response } from '@/api'

type User = IGet_User_Info_Response['data']

const nameSchema = z.object({
	firstName: z.string().min(1, "Ім'я обов'язкове"),
	lastName: z.string().min(1, "Прізвище обов'язкове")
})

type NameFormValues = z.infer<typeof nameSchema>

interface IEditNameModalProps extends IUseModalProps {
	user: User
}

const EditNameModal: FC<IEditNameModalProps> = ({ user, ...props }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NameFormValues>({
		resolver: zodResolver(nameSchema),
		defaultValues: {
			firstName: user.userProfile.firstName,
			lastName: user.userProfile.lastName
		}
	})

	const queryClient = useQueryClient()
	const { mutate, isPending } = useUpdateUserProfile()

	const onSubmit = (data: NameFormValues) => {
		mutate(data, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['user'] })
				props.onClose()
			}
		})
	}

	return (
		<Modal
			{...props}
			className='mx-auto h-fit w-[440px] max-w-md flex-col overflow-hidden rounded-[32px] bg-[#F3F3F3] p-5 text-black shadow-xl backdrop-blur-xl'>
			<Modal.Title onClose={props.onClose}>Змінити ім'я</Modal.Title>
			<Modal.Body className='flex flex-col pt-[40px]'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-[14px]'>
					<Input
						label="Ім'я"
						{...register('firstName')}
						error={errors.firstName?.message}
						className='border-none'
					/>
					<Input
						label='Прізвище'
						{...register('lastName')}
						error={errors.lastName?.message}
						className='border-none'
					/>
					<Button type='submit' variant='green' disabled={isPending}>
						{isPending ? 'Збереження...' : 'Зберегти'}
					</Button>
				</form>
			</Modal.Body>
		</Modal>
	)
}

export default EditNameModal
