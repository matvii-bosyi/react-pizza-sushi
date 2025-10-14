import { useMutation, useQuery } from '@tanstack/react-query'
import { UserService } from './user.service'
import type {
	ICreate_User_Address,
	IUpdate_User_Phone,
	IUpdate_User_Profile
} from './user.types'

export const useGetUserInfo = () =>
	useQuery({
		queryKey: ['user'],
		queryFn: () => UserService.getUserInfo().then(res => res.data.data)
	})

export const useUpdateUserProfile = () =>
	useMutation({
		mutationKey: ['update user profile'],
		mutationFn: (data: IUpdate_User_Profile) =>
			UserService.updateUserProfile({ data })
	})

export const useUpdateUserPhone = () =>
	useMutation({
		mutationKey: ['update user phone'],
		mutationFn: (data: IUpdate_User_Phone) =>
			UserService.updateUserPhone({ data })
	})

export const useCreateUserAddress = () =>
	useMutation({
		mutationKey: ['create user address'],
		mutationFn: (data: ICreate_User_Address) =>
			UserService.createUserAddress({ data })
	})

export const useUpdateUserAddress = () =>
	useMutation({
		mutationKey: ['update user address'],
		mutationFn: ({ id, data }: { id: string; data: ICreate_User_Address }) =>
			UserService.updateUserAddress(id, { data })
	})

export const useDeleteUserAddress = () =>
	useMutation({
		mutationKey: ['delete user address'],
		mutationFn: (id: string) => UserService.deleteUserAddress(id)
	})
