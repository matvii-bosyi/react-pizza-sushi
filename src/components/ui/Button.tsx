import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'green' | 'black' | 'red' | 'gray'
	rightIcon?: ReactNode
	leftIcon?: ReactNode
	children: ReactNode
}

const baseStyles =
	'inline-flex items-center justify-center rounded-[32px] px-[14px] py-[12.5px] disabled:cursor-not-allowed disabled:opacity-70'

const styles = {
	green: 'bg-[rgba(4,159,131,1)] text-white leading-[20px] font-[600] text-[15px] leading-[17px]',
	black: 'bg-black text-white',
	red: 'bg-red-500 text-white',
	gray: 'bg-gray-200 text-gray-800',
}

const Button: FC<ButtonProps> = ({
	variant,
	children,
	leftIcon,
	rightIcon,
	className,
	...props
}) => {
	return (
		<button
			className={cn(baseStyles, styles[variant], className)}
			{...props}
		>
			{leftIcon}
			{children}
			{rightIcon}
		</button>
	)
}

export default Button