import Modal from '@/components/ui/Modal/Modal'
import type { IUseModalProps } from '@/hooks/useModal'
import SmartPhoneIcon from '@/assets/icons/smartPhone.svg?react'
import LogoRed from '@/assets/logo/logo-red.svg?react'
import { Link, useNavigate } from 'react-router'
import { AppRoutes } from '@/config/routes'
import { useContext } from 'react'
import { AuthModalContext } from '@/context/AuthModalContext'
import { useAuth } from '@/hooks/useAuth'
import { BasketModalContext } from '@/context/BasketModalContext'
import UserIcon from '@/assets/icons/user.svg?react'
import CheckListIcon from '@/assets/icons/checkList.svg?react'
import CartIcon from '@/assets/icons/cart.svg?react'
import HeartIcon from '@/assets/icons/heart.svg?react'
import QuestionMarkOutlineIcon from '@/assets/icons/questionMarkOutline.svg?react'
import DocumentIcon from '@/assets/icons/document.svg?react'
import LogoutIcon from '@/assets/icons/logout.svg?react'

type IBurgerMenuProps = IUseModalProps

const MenuItem = ({ to, icon: Icon, text, onClick }: { to?: string, icon: React.ElementType, text: string, onClick?: () => void }) => (
	<Link to={to || ''} onClick={onClick} className='w-full flex items-center gap-[26px] py-[12px] px-[14px] text-[15px] font-[600]'>
		<Icon />
		<span>{text}</span>
	</Link>
)

const BurgerMenu = (props: IBurgerMenuProps) => {
	const { isAuth, logout } = useAuth()
	const authModal = useContext(AuthModalContext)
	const basketModal = useContext(BasketModalContext)
	const navigate = useNavigate()

	const handleProfileClick = () => {
		if (isAuth) {
			navigate('/user')
		} else {
			authModal?.onOpen()
		}
		props.onClose()
	}

	const handleFavoritesClick = () => {
		if (isAuth) {
			navigate('/favorites')
		} else {
			authModal?.onOpen()
		}
		props.onClose()
	}

	const handleBasketClick = () => {
		basketModal?.onOpen()
		props.onClose()
	}

	const handleLogout = () => {
		logout()
		props.onClose()
	}

	return (
		<Modal
			{...props}
			position='left'
			className='bg-[#F3F3F3] flex flex-col max-w-[272px] w-[272px] px-[14px]'
		>
			<Modal.Title onClose={props.onClose} className='pt-[14px] pb-[20px]'>
				<LogoRed />
			</Modal.Title>
			<Modal.Body className='flex-1 flex flex-col gap-[10px] '>
				<div className='h-[1px] bg-[#535863]/20 w-full' />
				<ul className='flex flex-col gap-[6px] text-[15px] font-[600]'>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>
						Заклади
					</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>
						Акції
					</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.ABOUT}>
						Про нас
					</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>
						Доставка та оплата
					</Link>
				</ul>
				<div className='h-[1px] bg-[#535863]/20 w-full' />
				<ul className='flex flex-col gap-[6px]'>
					<MenuItem onClick={handleProfileClick} icon={UserIcon} text='Мій Профіль' />
					{isAuth && <MenuItem to={AppRoutes.USER} icon={CheckListIcon} text='Мої замовлення' />}
					<MenuItem onClick={handleBasketClick} icon={CartIcon} text='Кошик' />
					<MenuItem onClick={handleFavoritesClick} icon={HeartIcon} text='Збережене' />
					{isAuth && <MenuItem to={AppRoutes.USER} icon={QuestionMarkOutlineIcon} text='Часті Питання' />}
					{isAuth && <MenuItem to={AppRoutes.USER} icon={DocumentIcon} text='Відстежити Замовлення' />}
					{isAuth && <MenuItem onClick={handleLogout} icon={LogoutIcon} text='Вийти' />}
				</ul>
			</Modal.Body>
			<Modal.Footer className='flex flex-col gap-4'>
				<a
					href='tel:0800204090'
					className='flex flex-row items-center gap-[22px] transition-all duration-300'
				>
					<SmartPhoneIcon />
					<p className='text-[16px] font-[600]'>0 800 204 090</p>
				</a>
			</Modal.Footer>
		</Modal>
	)
}

export default BurgerMenu
