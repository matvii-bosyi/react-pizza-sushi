import { createContext } from 'react'
import type { IUseModalProps } from '@/hooks/useModal'

export const BasketModalContext = createContext<IUseModalProps | null>(null);
