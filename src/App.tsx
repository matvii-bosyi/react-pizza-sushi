import { Route, Routes, type RouteObject } from 'react-router'
import { AppRoutes } from './config/routes'
import Main from './pages/main/Main'
import Layout from './components/Layouts/Layout'
import Providers from './providers/Providers'

const App = () => {
	const routes: Array<RouteObject> = [
		{ path: AppRoutes.MAIN, element: <Main /> }
	]

	return (
		<Providers>
			<Routes>
				<Route element={<Layout />}>
					{routes.map((r, index) => (
						<Route key={index} path={r.path} element={r.element} />
					))}
				</Route>
			</Routes>
		</Providers>
	)
}

export default App
