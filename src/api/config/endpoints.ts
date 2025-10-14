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
export const USER_UPDATE_ADDRESS_API_URL = (addressId: string) =>
	`/users/update-user-address/${addressId}`
export const USER_DELETE_ADDRESS_API_URL = (addressId: string) =>
	`/users/delete-user-address/${addressId}`

// Restaurants
export const RESTAURANTS_GET_ALL_API_URL = '/restaurants/get-restaurants'
export const RESTAURANTS_GET_TOP_API_URL = '/restaurants/get-top-restaurants'
export const RESTAURANTS_GET_BY_ID_API_URL = (restaurantId: string) =>
	`/restaurants/get-restaurant/${restaurantId}`

// Favorites
export const FAVORITES_ACTIONS_API_URL = '/favorites/actions-favorite'
export const FAVORITES_GET_ALL_API_URL = '/favorites/get-all-favorites'

// Products
export const PRODUCTS_GET_BY_ID_API_URL = (productId: string) =>
	`/products/get-product/${productId}`
export const PRODUCTS_GET_CATEGORIES_FOR_RESTAURANT_API_URL = (
	restaurantId: string
) => `/products/get-product-restaurants-category/${restaurantId}`
export const PRODUCTS_GET_BY_CATEGORY_IN_RESTAURANT_API_URL = (
	restaurantId: string
) => `/products/get-product-restaurants/${restaurantId}`

// Basket
export const BASKET_ACTIONS_API_URL = '/basket/actions-basket'
export const BASKET_GET_ALL_API_URL = '/basket/product-basket'
export const BASKET_GET_COUNT_API_URL = '/basket/count'

// Categories
export const CATEGORIES_GET_ALL_API_URL = '/categories/get-all'
export const CATEGORIES_GET_TOP_API_URL = '/categories/get-top'
