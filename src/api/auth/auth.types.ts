export interface IOTP {
	phone: string
}

export interface IOTP_Response {
	data?: unknown
}

export interface IOTP_Verify {
	phone: string
	code: string
}

export interface IOTP_Verify_Response {
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


export interface IOTP_Finalize {
	phone: string
	firstName: string
	lastName: string
}

export interface IOTP_Finalize_Response {
	data?: unknown
}

export interface IAdmin {
	email: 'string'
	password: 'string'
}

export interface IRefresh {
	refreshToken: string
}


export interface IRefresh_Response {
	data: {
		access_token: string
	}
}
