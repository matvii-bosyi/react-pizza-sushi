export interface IAddress {
	id: string
	city?: string
	locality?: string
	street?: string
	house?: string
	flat?: string
	floor?: string
	apartment?: string
	comment?: string
	type?: string
	isMain?: boolean
}

export interface IGet_User_Info_Response {
	success: boolean
	code: number
	message: string
	data: {
		id: string
		phone: string
		role: string
		userProfile: { firstName: string; lastName: string; addresses: IAddress[] }
	}
}

export interface IUpdate_User_Profile {
	firstName: string
	lastName: string
}

export interface IUpdate_User_Profile_Response {
	data: unknown
}

export interface IUpdate_User_Phone {
	phone: string
	otp: string
}

export interface IUpdate_User_Phone_Response {
	data: unknown
}

export interface ICreate_User_Address {
	city?: string
	locality?: string
	street?: string
	house?: string
	flat?: string
	floor?: string
	apartment?: string
	comment?: string
	type?: string
	isMain?: boolean
}