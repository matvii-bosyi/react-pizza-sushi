export const AppRoutes = {
	MAIN: '/',
	USER: '/user',
	RESTAURANTS: '/restaurants',
	RESTAURANT: '/restaurants/:id',
	PRODUCT: '/product/:id',
	FAVORITES: '/favorites',
	ABOUT: '/about'
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]
