import { create } from 'zustand'
import store from 'store2'
import { AUTH_STORE_NAME } from '@/config/store2.config'

interface AuthState {
	isAuth: boolean
	setAuth: (isAuth: boolean) => void
	logout: () => void
}

const authStorage = store.get(AUTH_STORE_NAME)

export const useAuthStore = create<AuthState>(set => ({
	isAuth: !!authStorage?.state?.accessToken,
	setAuth: isAuth => set({ isAuth }),
	logout: () => {
		store.remove(AUTH_STORE_NAME)
		set({ isAuth: false })
		window.location.href = '/'
	}
}))