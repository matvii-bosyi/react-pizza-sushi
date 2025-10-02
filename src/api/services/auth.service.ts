import {
	AUTH_OTP_API_URL,
	AUTH_OTP_VERIFY_API_URL,
	AUTH_OAUTH_API_URL,
	AUTH_OTP_FINALIZE_API_URL,
	AUTH_ADMIN_API_URL,
	AUTH_REFRESH_API_URL
} from '../endpoints'
import type {
	IAdmin,
	IOAuth,
	IOTP,
	IOTP_Finalize,
	IOTP_Verify,
	IRefresh
} from '../types/auth.interface'

import instance from '../interceptor'

export const AuthService = {
	otp: ({ data }: { data: IOTP }) =>
		instance({
			method: 'POST',
			url: AUTH_OTP_API_URL,
			data
		}),
	verifyOtp: ({ data }: { data: IOTP_Verify }) =>
		instance({
			method: 'POST',
			url: AUTH_OTP_VERIFY_API_URL,
			data
		}),
	oauth: ({ data }: { data: IOAuth }) =>
		instance({
			method: 'POST',
			url: AUTH_OAUTH_API_URL,
			data
		}),
	finalizeOtp: ({ data }: { data: IOTP_Finalize }) =>
		instance({
			method: 'POST',
			url: AUTH_OTP_FINALIZE_API_URL,
			data
		}),
	adminLogin: ({ data }: { data: IAdmin }) =>
		instance({
			method: 'POST',
			url: AUTH_ADMIN_API_URL,
			data
		}),
	refreshToken: ({ data }: { data: IRefresh }) =>
		instance({
			method: 'POST',
			url: AUTH_REFRESH_API_URL,
			data
		})
}
