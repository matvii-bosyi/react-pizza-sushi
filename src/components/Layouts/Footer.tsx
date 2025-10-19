import LogoWhite from '@/assets/logo/logo-white.svg?react'
import { AppRoutes } from '@/config/routes'
import { Link } from 'react-router'

const Footer = () => {
	return (
		<footer className='my-[60px] w-full max-w-[1320px] mx-auto bg-[#181818] rounded-[50px] text-white px-5 sm:px-[60px] pt-[40px] pb-[18px]'>
			<div className='pb-[20px] sm:pb-[100px] flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-10 lg:gap-0'>
				<LogoWhite className='w-[250px] h-auto sm:w-[350px] sm:h-[77px] mt-[28.5px]' />
				<div className='flex flex-col md:flex-row gap-[40px] md:gap-[80px] text-center md:text-left'>
					<ul className='footer-links'>
						<li>
							<Link to={AppRoutes.RESTAURANTS}>Заклади</Link>
						</li>
						<li>
							<Link to='/'>Акції</Link>
						</li>
						<li>
							<Link to={AppRoutes.ABOUT}>Про нас</Link>
						</li>
						<li>
							<Link to='/'>Доставка та оплата</Link>
						</li>
					</ul>
					<ul className='footer-links'>
						<li>
							<Link to='/'>Політика використання cookies</Link>
						</li>
						<li>
							<Link to='/'>Договір публічної оферти</Link>
						</li>
						<li>
							<Link to='/'>Політика конфіденційності</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className='h-[1px] bg-[#FFF]/20 w-full' />
			<span className='block text-center text-[14px] leading-[24px] font-[600] pt-[18px]'>
				© Smaki 2025
			</span>
		</footer>
	)
}

export default Footer
