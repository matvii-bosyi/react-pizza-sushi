import { Link, useNavigate } from 'react-router'
import HomeIcon from '@/assets/icons/home.svg?react'
import DocumentIcon from '@/assets/icons/document.svg?react'
import CartIcon from '@/assets/icons/cart.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import { AppRoutes } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import { useContext } from 'react'
import { AuthModalContext } from '@/context/AuthModalContext'
import { BasketModalContext } from '@/context/BasketModalContext'

const BottomNavigation = () => {
	const { isAuth } = useAuth()
	const authModal = useContext(AuthModalContext)
	const basketModal = useContext(BasketModalContext)
	const navigate = useNavigate()

	const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!isAuth) {
			e.preventDefault()
			authModal?.onOpen()
		}
	}

	return (
		<div className='fixed bottom-0 left-0 w-full bg-white shadow-top z-10 lg:hidden'>
			<div className='flex justify-around items-center h-[70px]'>
				<Link to={AppRoutes.MAIN} className='flex flex-col items-center gap-1'>
					<HomeIcon />
					<span className='text-xs'>Головна</span>
				</Link>
				<div className='flex flex-col items-center gap-1 text-gray-400'>
					<DocumentIcon />
					<span className='text-xs'>Відстежити</span>
				</div>
				<button
					onClick={basketModal?.onOpen}
					className='flex flex-col items-center gap-1'
				>
					<CartIcon />
					<span className='text-xs'>Кошик</span>
				</button>
				<Link
					to={isAuth ? '/user' : '#'}
					onClick={handleProfileClick}
					className='flex flex-col items-center gap-1'
				>
					<UserIcon />
					<span className='text-xs'>Профіль</span>
				</Link>
			</div>
		</div>
	)
}

export default BottomNavigation
