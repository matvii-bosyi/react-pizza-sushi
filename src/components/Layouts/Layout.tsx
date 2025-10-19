import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import useModal from '@/hooks/useModal'
import AuthModal from '@/features/auth-modal/AuthModal'
import Basket from '@/features/basket/Basket'
import { BasketModalContext } from '@/context/BasketModalContext'
import { AuthModalContext } from '@/context/AuthModalContext'
import BurgerMenu from '@/features/burger-menu/BurgerMenu'
import { BurgerMenuContext } from '@/context/BurgerMenuContext'
import BottomNavigation from './BottomNavigation'

const Layout = () => {
	const authModal = useModal()
	const basketModal = useModal()
	const burgerMenuModal = useModal()

	return (
		<AuthModalContext.Provider value={authModal}>
			<BasketModalContext.Provider value={basketModal}>
				<BurgerMenuContext.Provider value={burgerMenuModal}>
					<div className='min-h-screen flex flex-col pt-[80px] lg:pt-[161px] pb-[70px] lg:pb-0'>
						<Header
							basketModal={basketModal}
							burgerMenuModal={burgerMenuModal}
						/>

						<main className="max-w-[1320px] w-full mx-auto flex flex-1 px-5 sm:px-0">
							<Outlet />
						</main>

						<Footer />

						<AuthModal {...authModal} />
						<Basket {...basketModal} />
						<BurgerMenu {...burgerMenuModal} />
						<BottomNavigation />
					</div>
				</BurgerMenuContext.Provider>
			</BasketModalContext.Provider>
		</AuthModalContext.Provider>
	)
}

export default Layout
