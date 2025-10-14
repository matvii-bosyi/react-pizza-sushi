import Modal from '@/components/ui/Modal/Modal'
import type { IUseModalProps } from '@/hooks/useModal'
import SmartPhoneIcon from '@/assets/icons/smartPhone.svg?react'
import LogoRed from '@/assets/logo/logo-red.svg?react'
import { Link } from 'react-router'
import { AppRoutes } from '@/config/routes'

type IBurgerMenuProps = IUseModalProps

const BurgerMenu = (props: IBurgerMenuProps) => {
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
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>Заклади</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>Акції</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>Про нас</Link>
					<Link className='py-[12px] px-[14px]' to={AppRoutes.RESTAURANTS}>Доставка та оплата</Link>
				</ul>
			</Modal.Body>
			<Modal.Footer className=''>
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
