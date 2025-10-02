import type { IAPI_Response } from './response.interface'

export interface IOTP {
	phone: string
}

export interface IOTP_Response extends IAPI_Response {
	data?: any
}

export interface IOTP_Verify {
	phone: string
	code: string
}

export interface IOTP_Verify_Response extends IAPI_Response {
	data: {
		tokens: { access_token: string; refresh_token: string }
		isNewUser: boolean
	}
}

export interface IOAuth {
	providerId?: string
	email?: string
	provider?: string
}

export interface IOAuth_Response extends IAPI_Response {}

export interface IOTP_Finalize {
	phone: string
	firstName: string
	lastName: string
}

export interface IOTP_Finalize_Response extends IAPI_Response {
	data?: any
}

export interface IAdmin {
	email: 'string'
	password: 'string'
}

export interface IRefresh {
	refreshToken: string
}
