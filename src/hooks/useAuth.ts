import { useAuthStore } from '../stores/auth.store'

export const useAuth = () => {
	const { isAuth, setAuth, logout } = useAuthStore()
	return { isAuth, setAuth, logout }
}