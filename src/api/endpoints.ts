export const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const API_URL = `${SERVER_URL}/api`

// Auth
export const AUTH_OTP_API_URL = '/auth/otp'
export const AUTH_OTP_VERIFY_API_URL = '/auth/otp-verify'
export const AUTH_OAUTH_API_URL = '/auth/oauth'
export const AUTH_OTP_FINALIZE_API_URL = '/auth/otp-finalize'
export const AUTH_ADMIN_API_URL = '/auth/admin'
export const AUTH_REFRESH_API_URL = '/auth/refresh'

// User
export const USER_GET_INFO_API_URL = '/users/get-user-info'
export const USER_UPDATE_PROFILE_API_URL = '/users/update-user-profile'
export const USER_UPDATE_PHONE_API_URL = '/users/update-user-phone'
export const USER_CREATE_ADDRESS_API_URL = '/users/create-user-address'
export const USER_UPDATE_ADDRESS_API_URL = (addressId: string) => `/users/update-user-address/${addressId}`
export const USER_DELETE_ADDRESS_API_URL = (addressId: string) => `/users/delete-user-address/${addressId}`
