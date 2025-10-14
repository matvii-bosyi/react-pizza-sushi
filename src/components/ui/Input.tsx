import { cn } from '@/lib/cn'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	wrapperClassName?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			label,
			error,
			wrapperClassName,
			leftIcon,
			rightIcon,
			...props
		},
		ref
	) => {
		const generatedId = useId()
		const id = props.id || generatedId

		return (
			<div className={cn('relative w-full', wrapperClassName)}>
				{label && (
					<label
						htmlFor={id}
						className="mb-1 block text-sm font-medium text-gray-700"
					>
						{label}
					</label>
				)}
				<div className="relative">
					{leftIcon && (
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							{leftIcon}
						</div>
					)}
					<input
						type={type}
						id={id}
						className={cn(
							'flex w-full rounded-[24px] border bg-white px-[14px] py-[13.5px] text-[16px] leading-[17px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
							error
								? 'border-red-500 text-red-900 placeholder:text-red-300 focus-visible:ring-red-500'
								: 'border-gray-300',
							leftIcon ? 'pl-10' : '',
							rightIcon ? 'pr-10' : '',
							className
						)}
						ref={ref}
						{...props}
					/>
					{rightIcon && (
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							{rightIcon}
						</div>
					)}
				</div>
				{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			</div>
		)
	}
)
Input.displayName = 'Input'

export default Input