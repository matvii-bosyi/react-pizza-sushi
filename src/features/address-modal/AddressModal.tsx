import { useEffect, type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import type { IUseModalProps } from '@/hooks/useModal'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {
	useCreateUserAddress,
	useUpdateUserAddress,
} from '@/api'
import type { ICreate_User_Address } from '@/api'
import { addressSchema, type AddressSchema } from './lib/schemas'
import Checkbox from '@/components/ui/Checkbox'

interface IAddressModalProps extends IUseModalProps {
	address?: ICreate_User_Address & { id: string }
}

const AddressModal: FC<IAddressModalProps> = ({ address, ...props }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<AddressSchema>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			city: '',
			street: '',
			house: '',
			locality: '',
			flat: '',
			floor: '',
			apartment: '',
			comment: '',
			type: '',
			isMain: false,
		},
	})

	useEffect(() => {
		if (props.isOpen) {
			if (address) {
				reset({ ...address, isMain: address.isMain ?? false })
			} else {
				reset({
					city: '',
					street: '',
					house: '',
					locality: '',
					flat: '',
					floor: '',
					apartment: '',
					comment: '',
					type: '',
					isMain: false,
				})
			}
		}
	}, [address, props.isOpen, reset])

	const queryClient = useQueryClient()
	const { mutate: createAddress, isPending: isCreating } = useCreateUserAddress()
	const { mutate: updateAddress, isPending: isUpdating } = useUpdateUserAddress()
	const isPending = isCreating || isUpdating

	const onSubmit = (data: AddressSchema) => {
		if (address) {
			updateAddress(
				{ id: address.id, data },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['user'] })
						props.onClose()
					},
				}
			)
		} else {
			createAddress(data, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['user'] })
					props.onClose()
				},
			})
		}
	}

	return (
		<Modal
			{...props}
			className='mx-auto h-fit w-[440px] max-w-md flex-col overflow-hidden rounded-[32px] bg-[#F3F3F3] p-5 text-black shadow-xl backdrop-blur-xl'
		>
			<Modal.Title onClose={props.onClose}>
				{address ? 'Редагувати адресу' : 'Додати адресу'}
			</Modal.Title>
			<Modal.Body className='flex flex-col pt-[40px]'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-[14px]'
				>
					<Input label='Місто' {...register('city')} error={errors.city?.message} />
					<Input
						label='Район'
						{...register('locality')}
						error={errors.locality?.message}
					/>
					<Input
						label='Вулиця'
						{...register('street')}
						error={errors.street?.message}
					/>
					<Input
						label='Будинок'
						{...register('house')} error={errors.house?.message}
					/>
					<Input label='Квартира' {...register('flat')} error={errors.flat?.message} />
					<Input label='Поверх' {...register('floor')} error={errors.floor?.message} />
					<Controller
						name='isMain'
						control={control}
						render={({ field }) => (
							<Checkbox
								onChange={field.onChange}
								checked={field.value ?? false}
								label='Зробити основною'
							/>
						)}
					/>
					<Button type='submit' variant='green' disabled={isPending}>
						{isPending ? 'Збереження...' : 'Зберегти'}
					</Button>
				</form>
			</Modal.Body>
		</Modal>
	)
}

export default AddressModal
