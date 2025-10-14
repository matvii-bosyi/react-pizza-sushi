import React from 'react'
import Arrow from '@/assets/icons/arrow.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import CheckListIcon from '@/assets/icons/checkList.svg?react'
import QuestionMarkOutlineIcon from '@/assets/icons/questionMarkOutline.svg?react'
import DocumentIcon from '@/assets/icons/document.svg?react'
import HeartIcon from '@/assets/icons/heart.svg?react'
import LogoutIcon from '@/assets/icons/logout.svg?react'
import { cn } from '@/lib/cn'

const MenuItem = ({
	icon: Icon,
	text,
	onClick,
	isActive
}: {
	icon: React.ElementType
	text: string
	onClick: () => void
	isActive: boolean
}) => (
	<button
		onClick={onClick}
		className={cn(
			'w-full flex items-center justify-between py-[20px] transition-colors'
		)}>
		<div className='flex items-center gap-[26px]'>
			<Icon color={isActive ? '#dd302c' : '#181818'} className={isActive ? '' : 'opacity-50'} />
			<span className={`text-[15px] font-[600] ${isActive ? 'text-[#dd302c]' : 'text-[#181818]'}`}>{text}</span>
		</div>
		<Arrow color={isActive ? '#dd302c' : '#181818'} className={isActive ? '' : 'opacity-50'}/>
	</button>
)

const MenuDivider = () => <div className='h-px bg-gray-200' />

export default function SidebarMenu({
	activeView,
	setView,
	onLogout
}: {
	activeView: string
	setView: (view: string) => void
	onLogout: () => void
}) {
	const menuItems = [
		{ icon: UserIcon, text: 'Особисті дані' },
		{ icon: CheckListIcon, text: 'Мої замовлення' },
		{ icon: QuestionMarkOutlineIcon, text: 'Часті запитання' },
		{ icon: DocumentIcon, text: 'Відстежити замовлення' },
		{ icon: HeartIcon, text: 'Збережене' },
		{ icon: LogoutIcon, text: 'Вийти', action: onLogout }
	]

	return (
		<div className='w-full bg-white rounded-[26px] py-[10px] px-[20px]'>
			{menuItems.map((item, index) => (
				<React.Fragment key={index}>
					<MenuItem
						icon={item.icon}
						text={item.text}
						onClick={() => (item.action ? item.action() : setView(item.text))}
						isActive={activeView === item.text}
					/>
					{index < menuItems.length - 1 && <MenuDivider />}
				</React.Fragment>
			))}
		</div>
	)
}
