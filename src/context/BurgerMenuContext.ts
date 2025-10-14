import { createContext } from 'react'
import type { IUseModalProps } from '@/hooks/useModal'

export const BurgerMenuContext = createContext<IUseModalProps | null>(null)
