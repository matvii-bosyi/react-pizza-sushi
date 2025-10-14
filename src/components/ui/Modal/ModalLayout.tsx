import Portal from '@/common/Portal'
import type { IUseModalProps } from '@/hooks/useModal'
import { cn } from '@/lib/cn'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import { useState, useEffect } from 'react'

interface IModalLayoutProps extends PropsWithChildren<IUseModalProps> {
	className?: string
	style?: CSSProperties
    position?: 'center' | 'right' | 'left'
}

const ModalLayout: FC<IModalLayoutProps> = ({
	isOpen,
	onClose,
	animation,
	children,
	className,
	style,
    position = 'center'
}) => {
    const isRight = position === 'right';
    const isLeft = position === 'left';
    const isSide = isRight || isLeft;
    const [isContentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        if (isOpen && animation === 'in') {
            requestAnimationFrame(() => {
                setContentVisible(true);
            });
        } else {
            setContentVisible(false);
        }
    }, [isOpen, animation]);

	if (!isOpen) return null

	return (
		<Portal target='modals-root'>
			<div
				style={{ ...(style || {}) }}
				onClick={e => {
					e.stopPropagation()
					onClose()
				}}
				className={cn(
					'h-dvh overscroll-none z-[70] top-0 left-0 w-full bg-neutral-800/20 duration-0 flex fixed backdrop-blur-md',
					!isSide && 'justify-center items-center',
                    isRight && 'justify-end',
                    isLeft && 'justify-start',
					animation === 'out' ? 'animate-fade-out' : 'animate-fade-in'
				)}>
				<div
					onClick={e => e.stopPropagation()}
					className={cn(
						'overflow-y-auto transition-all duration-300 ease-in-out',
						className,
                        isSide ? 'h-full w-full max-w-md' : 'w-full min-h-[200px] max-h-dvh',
                        isRight && (!isContentVisible ? 'translate-x-full' : 'translate-x-0'),
                        isLeft && (!isContentVisible ? '-translate-x-full' : 'translate-x-0'),
                        !isSide && (!isContentVisible ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0')
					)}>
					{children}
				</div>
			</div>
		</Portal>
	)
}

export default ModalLayout
