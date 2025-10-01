import { Route, Routes, type RouteObject } from 'react-router'
import { AppRoutes } from './config/routes'
import Main from './pages/main/Main'
import Layout from './components/Layouts/Layout'

const App = () => {
	const routes: Array<RouteObject> = [
		{ path: AppRoutes.MAIN, element: <Main /> }
	]

	return (
		<Routes>
			<Route element={<Layout />}>
				{routes.map((r, index) => (
					<Route key={index} path={r.path} element={r.element} />
				))}
			</Route>
		</Routes>
	)
}

export default App
