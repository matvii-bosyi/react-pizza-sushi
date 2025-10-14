import { Route, Routes, type RouteObject } from 'react-router'
import { AppRoutes } from './config/routes'
import Main from './pages/main/Main'
import Layout from './components/layouts/Layout'
import Providers from './providers/Providers'
import User from './pages/user/User'
import Restaurants from './pages/restaurants/Restaurants'
import Restaurant from './pages/restaurant/Restaurant'
import Product from './pages/product/Product'
import Favorites from './pages/favorites/Favorites'

const App = () => {
	const routes: Array<RouteObject> = [
		{ path: AppRoutes.MAIN, element: <Main /> },
		{ path: AppRoutes.USER, element: <User /> },
		{ path: AppRoutes.RESTAURANTS, element: <Restaurants /> },
		{ path: AppRoutes.RESTAURANT, element: <Restaurant /> },
		{ path: AppRoutes.PRODUCT, element: <Product /> },
		{ path: AppRoutes.FAVORITES, element: <Favorites /> }
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
