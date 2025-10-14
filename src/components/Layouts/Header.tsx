import PinFillIcon from '@/assets/icons/pinFill.svg?react'
import SmartPhoneIcon from '@/assets/icons/smartPhone.svg?react'
import SearchIcon from '@/assets/icons/search.svg?react'
import HeartIcon from '@/assets/icons/heart.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import CartIcon from '@/assets/icons/cart.svg?react'
import BurgerMenuIcon from '@/assets/icons/burgerMenu.svg?react'
import Logo from '@/assets/logo/logo-red.svg?react'
import Button from '@/components/ui/Button'
import type { IUseModalProps } from '@/hooks/useModal'
import { useAuth } from '@/hooks/useAuth'
import { Link, useNavigate } from 'react-router'
import { AppRoutes } from '@/config/routes'
import { useContext, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { AuthModalContext } from '@/context/AuthModalContext'

const Header = ({
	basketModal,
	burgerMenuModal
}: {
	basketModal: IUseModalProps
	burgerMenuModal: IUseModalProps
}) => {
	const { isAuth } = useAuth()
	const authModal = useContext(AuthModalContext)
	const navigate = useNavigate()
	const [isScrolled, setIsScrolled] = useState(false)

	const handleProfileClick = () => {
		if (isAuth) {
			navigate('/user')
		} else {
			authModal?.onOpen()
		}
	}

	const handleFavoritesClick = () => {
		if (isAuth) {
			navigate('/user/favorites')
		} else {
			authModal?.onOpen()
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header
			className={cn(
				'fixed top-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-[1440px] bg-white py-[20px] px-[60px] rounded-b-[40px] flex flex-col justify-between items-center shadow-header transition-all duration-400',
				isScrolled && 'gap-0'
			)}
		>
			<div className='w-full flex flex-row justify-between items-center'>
				<div className='flex flex-row items-center gap-[20px]'>
					{isScrolled && (
					<button
						onClick={burgerMenuModal.onOpen}
						className={cn(
							'transition-all duration-300 border-[2px] border-black rounded-[15px] p-[6px]',
						)}
					>
						<BurgerMenuIcon />
					</button>
					)}
					<div className='flex items-center'>
						<PinFillIcon color='#dd302c' className='mr-[6px]' />
						<div>

						<p className='text-[#181818]/60 text-[12px] font-[500]'>
							Ваше місто
						</p>
						{/* Custom select */}
						</div>
					</div>
				</div>
				<div>
					<Link to={'/'}>
						<Logo />
					</Link>
				</div>
				<div className={'flex flex-row items-center gap-[10px] transition-all'}>
					<a
						href='tel:0800204090'
						className={cn(
							'flex flex-row items-center gap-[22px] transition-all duration-300',
							isScrolled
								? 'opacity-0 invisible'
								: 'opacity-100 visible'
						)}
					>
						<SmartPhoneIcon />
						<p className='text-[16px] font-[600]'>0 800 204 090</p>
					</a>
					<div
						className={cn(
							'flex flex-row items-center gap-[10px] transition-all duration-300 absolute top-1/2 right-[40px] -translate-y-1/2',
							isScrolled
								? 'opacity-100 visible'
								: 'opacity-0 invisible'
						)}
					>
						<button className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'>
							<SearchIcon />
						</button>
						<button onClick={handleFavoritesClick} className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'>
							<HeartIcon />
						</button>
						<button
							className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'
							onClick={handleProfileClick}
						>
							<UserIcon />
						</button>
						<Button
							variant='green'
							onClick={basketModal.onOpen}
							leftIcon={
								<CartIcon
									width={21.98}
									height={19}
									className='mr-[9px]'
								/>
							}
						>
							Кошик
						</Button>
					</div>
				</div>
			</div>
			<div
				className={cn(
					'transition-all duration-300 w-full',
					isScrolled
						? 'opacity-0 invisible h-0'
						: 'opacity-100 visible h-full'
				)}
			>
				<div
					className={cn(
						'h-[1px] bg-[#ECF0F4] w-full mt-[16px]',
						isScrolled && 'hidden'
					)}
				/>
				<div
					className={cn(
						'w-full flex flex-row justify-between items-center mt-[16px]',
						isScrolled && 'hidden'
					)}
				>
					<ul className='flex flex-row items-center gap-[40px] text-[15px] font-[600]'>
						<Link to={AppRoutes.RESTAURANTS}>Заклади</Link>
						<Link to={AppRoutes.RESTAURANTS}>Акції</Link>
						<Link to={AppRoutes.RESTAURANTS}>Про нас</Link>
						<Link to={AppRoutes.RESTAURANTS}>Доставка та оплата</Link>
					</ul>
					<div className='flex flex-row items-center gap-[10px]'>
						<button className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'>
							<SearchIcon />
						</button>
						<button onClick={handleFavoritesClick} className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'>
							<HeartIcon />
						</button>
						<button
							className='bg-[#F3F3F3] rounded-[14px] flex items-center justify-center cursor-pointer w-[44px] h-[44px] transition-colors duration-400 hover:bg-transparent hover:text-[#DD302C]'
							onClick={handleProfileClick}
						>
							<UserIcon />
						</button>
						<Button
							variant='green'
							onClick={basketModal.onOpen}
							leftIcon={
								<CartIcon
									width={21.98}
									height={19}
									className='mr-[9px]'
								/>
							}
						>
							Кошик
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
