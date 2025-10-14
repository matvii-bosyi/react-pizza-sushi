import { createContext } from 'react'
import type { IUseModalProps } from '@/hooks/useModal'

export const AuthModalContext = createContext<IUseModalProps | null>(null);
