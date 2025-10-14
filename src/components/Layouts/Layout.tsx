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

const Layout = () => {
	const authModal = useModal()
	const basketModal = useModal()
	const burgerMenuModal = useModal()

	return (
		<AuthModalContext.Provider value={authModal}>
			<BasketModalContext.Provider value={basketModal}>
				<BurgerMenuContext.Provider value={burgerMenuModal}>
					<div className='min-h-screen flex flex-col pt-[161px]'>
						<Header
							basketModal={basketModal}
							burgerMenuModal={burgerMenuModal}
						/>

						<main className="max-w-[1320px] w-full mx-auto flex flex-1">
							<Outlet />
						</main>

						<Footer />

						<AuthModal {...authModal} />
						<Basket {...basketModal} />
						<BurgerMenu {...burgerMenuModal} />
					</div>
				</BurgerMenuContext.Provider>
			</BasketModalContext.Provider>
		</AuthModalContext.Provider>
	)
}

export default Layout
