export const AppRoutes = {
	MAIN: '/'
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]
