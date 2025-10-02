import { useMutation } from '@tanstack/react-query'
import store from 'store2'
import { AUTH_STORE_NAME } from '../../config/store2.config'
import { AuthService } from '../services/auth.service'
import type {
	IOTP,
	IOTP_Verify,
	IOTP_Finalize
} from '../types/auth.interface'

export const useRequestOtpMutation = () => {
	return useMutation({
		mutationKey: ['request-otp'],
		mutationFn: (data: IOTP) => AuthService.otp({ data })
	})
}

export const useVerifyOtpMutation = () => {
	return useMutation({
		mutationKey: ['verify-otp'],
		mutationFn: (data: IOTP_Verify) => AuthService.verifyOtp({ data }),
		onSuccess: response => {
			const { access_token, refresh_token } = response.data.data.tokens
			if (access_token) {
				store.set(AUTH_STORE_NAME, {
					state: {
						access_token: access_token,
						refresh_token: refresh_token
					}
				})
			}
		}
	})
}

export const useFinalizeOtpMutation = () => {
	return useMutation({
		mutationKey: ['finalize-otp'],
		mutationFn: (data: IOTP_Finalize) => AuthService.finalizeOtp({ data })
	})
}
