export const AppRoutes = {
	MAIN: '/',
	USER: '/user',
	RESTAURANTS: '/restaurants',
	RESTAURANT: '/restaurants/:id',
	PRODUCT: '/product/:id'
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]
