import {
	USER_CREATE_ADDRESS_API_URL,
	USER_DELETE_ADDRESS_API_URL,
	USER_GET_INFO_API_URL,
	USER_UPDATE_ADDRESS_API_URL,
	USER_UPDATE_PHONE_API_URL,
	USER_UPDATE_PROFILE_API_URL
} from '../endpoints'
import instance from '../interceptor'
import type { ICreate_User_Address, IUpdate_User_Phone, IUpdate_User_Profile } from '../types/user.interface'

export const UserService = {
	getUserInfo: () =>
		instance({
			method: 'GET',
			url: USER_GET_INFO_API_URL
		}),
	updateUserProfile: ({ data }: { data: IUpdate_User_Profile }) =>
		instance({
			method: 'POST',
			url: USER_UPDATE_PROFILE_API_URL,
			data
		}),
	updateUserPhone: ({ data }: { data: IUpdate_User_Phone }) => instance({
		method: 'POST',
		url: USER_UPDATE_PHONE_API_URL,
		data
	}),
	createUserAddress: ({data}: {data: ICreate_User_Address}) => instance({
		method: 'POST',
		url: USER_CREATE_ADDRESS_API_URL,
		data
	}),
	updateUserAddress: (id: string, {data}: {data:ICreate_User_Address}) => instance({
		method: 'POST',
		url: USER_UPDATE_ADDRESS_API_URL(id),
		data
	}),
	deleteUserAddress: (id: string) => instance({
		method: 'POST',
		url: USER_DELETE_ADDRESS_API_URL(id),
	})
}
