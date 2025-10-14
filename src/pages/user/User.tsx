import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfo } from '@/api'
import { formatPhone } from '@/lib/formatPhone'

import SidebarMenu from './components/SidebarNavigation'
import PersonalData from './views/PersonalData'
import OrderHistory from './views/OrderHistory'
import FAQ from './views/FAQ'
import TrackOrder from './views/TrackOrder'
import Favorites from './views/Favorites'

import UserOutlineIcon from '@/assets/icons/userOutline.svg?react'

const User = () => {
	const { data: user, isLoading } = useGetUserInfo()
	const [activeView, setActiveView] = useState('Особисті дані')
	const { logout } = useAuth()

	return (
		<div className='flex flex-row w-full gap-[39px] pt-[30px]'>
			<aside className='flex flex-col gap-[10px] flex-1'>
				<div className='bg-white px-[20px] py-[26px] rounded-[26px] flex flex-row items-center gap-[13.33px]'>
					<UserOutlineIcon
						color='#535863'
						className='opacity-40 scale-[1.6]'
					/>

					{isLoading ? (
						<div className='flex flex-col gap-y-1'>
							<div className='h-[20px] w-[150px] bg-gray-200 animate-pulse rounded-md' />
							<div className='h-[12px] w-[120px] bg-gray-200 animate-pulse rounded-md' />
						</div>
					) : (
						<div>
							<p className='leading-[20px] font-[600]'>
								{user.userProfile.firstName} {user.userProfile.lastName}
							</p>
							<p className='text-[#535863] text-[12px] opacity-80 font-[500]'>
								{formatPhone(user.phone)}
							</p>
						</div>
					)}
				</div>
				<SidebarMenu
					activeView={activeView}
					setView={setActiveView}
					onLogout={logout}
				/>
			</aside>
			<div className='flex-2'>
				{(() => {
					switch (activeView) {
						case 'Особисті дані':
							return <PersonalData user={user} />
						case 'Мої замовлення':
							return <OrderHistory />
						case 'Часті запитання':
							return <FAQ />
						case 'Відстежити замовлення':
							return <TrackOrder />
						case 'Збережене':
							return <Favorites />
						default:
							return <PersonalData user={user} />
					}
				})()}
			</div>
		</div>
	)
}

export default User
