import { useState, type FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { IGet_User_Info_Response, ICreate_User_Address } from '@/api'
import { formatPhone } from '@/lib/formatPhone'
import PencilIcon from '@/assets/icons/pencil.svg?react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'
import useModal from '@/hooks/useModal'
import EditNameModal from '@/features/edit-name-modal/EditNameModal'
import AddressModal from '@/features/address-modal/AddressModal'
import { useDeleteUserAddress, useUpdateUserAddress } from '@/api'
import ConfirmationModal from '@/features/confirmation-modal/ConfirmationModal'

type User = IGet_User_Info_Response['data']
type Address = ICreate_User_Address & { id: string }

const PersonalData: FC<{ user: User | undefined }> = ({ user }) => {
	const [editedAddress, setEditedAddress] = useState<Address | undefined>(
		undefined
	)
	const [deletingAddressId, setDeletingAddressId] = useState<
		string | undefined
	>(undefined)

	const editNameModal = useModal()
	const addressModal = useModal()
	const confirmationModal = useModal()
	const queryClient = useQueryClient()

	const { mutate: deleteAddress, isPending: isDeletingAddress } =
		useDeleteUserAddress()
	const { mutate: updateAddress } = useUpdateUserAddress()

	const handleAddAddress = () => {
		setEditedAddress(undefined)
		addressModal.onOpen()
	}

	const handleEditAddress = (address: Address) => {
		setEditedAddress(address)
		addressModal.onOpen()
	}

	const handleDeleteAddress = (id: string) => {
		setDeletingAddressId(id)
		confirmationModal.onOpen()
	}

	const onConfirmDelete = () => {
		if (deletingAddressId) {
			deleteAddress(deletingAddressId, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['user'] })
					confirmationModal.onClose()
				}
			})
		}
	}

	const handleSetMainAddress = (id: string) => {
		const address = user?.userProfile.addresses.find(a => a.id === id)
		if (address) {
			const { id: _id, ...data } = address
			updateAddress(
				{ id, data: { ...data, isMain: true } },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['user'] })
					}
				}
			)
		}
	}

	if (!user) {
		return null
	}

	return (
		<div>
			<h3 className='text-[22px] font-[700]'>Особисті дані</h3>

			<div className='flex flex-col gap-y-2 mt-4'>
				<div className='bg-white rounded-[16px] p-[16px] text-[14px] leading-[20px] flex justify-between'>
					<div>
						<p className='text-[#535863] opacity-80 font-[500] mb-1'>Ім'я</p>
						<p className='text-[#181818] font-[600]'>
							{user.userProfile.firstName} {user.userProfile.lastName}
						</p>
					</div>
					<button onClick={editNameModal.onOpen}>
						<PencilIcon color='#535863' />
					</button>
				</div>

				<div className='bg-white rounded-[16px] p-[16px] text-[14px] leading-[20px] flex justify-between'>
					<div>
						<p className='text-[#535863] opacity-80 font-[500] mb-1'>Телефон</p>
						<p className='text-[#181818] font-[600]'>
							{formatPhone(user.phone)}
						</p>
					</div>
					<PencilIcon color='#535863' />
				</div>

				<div className='bg-white rounded-[16px] p-[16px] text-[14px] leading-[20px]'>
					<div className='flex justify-between items-center mb-4'>
						<p className='text-[#535863] opacity-80 font-[500]'>Адреса</p>
					</div>
					<div className='flex flex-col gap-y-4'>
						{user.userProfile.addresses?.map((address: Address) => (
							<div
								key={address.id}
								className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'
							>
								<div className='flex items-center'>
									<input
										type='radio'
										name='mainAddress'
										checked={address.isMain}
										onChange={() => handleSetMainAddress(address.id)}
										className='custom-radio mr-4'
									/>
									<span className='text-[#181818] font-[500]'>
										{[
											address.city,
											address.locality,
											address.street && `вулиця ${address.street}`,
											address.house && `будинок ${address.house}`,
											address.flat && `кв. ${address.flat}`,
											address.floor && `поверх ${address.floor}`
										]
											.filter(Boolean)
											.join(', ')}
									</span>
								</div>
								<div className='flex items-center gap-x-3'>
									<button onClick={() => handleEditAddress(address)}>
										<PencilIcon color='#535863' />
									</button>
									<button onClick={() => handleDeleteAddress(address.id)}>
										<TrashIcon color='#DD302C' />
									</button>
								</div>
							</div>
						))}
					</div>
					<button
						onClick={handleAddAddress}
						className='mt-[16px] flex items-center gap-1 text-[15px] font-[600] text-[#049F83]'>
						Додати адресу <PlusIcon />
					</button>
				</div>
			</div>

			<EditNameModal {...editNameModal} user={user} />
			<AddressModal {...addressModal} address={editedAddress} />
			<ConfirmationModal
				{...confirmationModal}
				onConfirm={onConfirmDelete}
				title='Ви впевнені, що хочете видалити цю адресу?'
				isPending={isDeletingAddress}
			/>
		</div>
	)
}

export default PersonalData
