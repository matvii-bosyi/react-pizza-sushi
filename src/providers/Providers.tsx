import type { FC, PropsWithChildren } from 'react'
import TanstackQueryProvider from './TanstackQueryProvider'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}

export default Providers
