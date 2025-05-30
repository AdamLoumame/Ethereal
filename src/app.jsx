import { lazy } from "react"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import "nprogress/nprogress.css"
import { getById } from "./services/api"
import useLoader from "./utils/useLoader"
import ErrorPage from "./components/ErrorPage"

let Home = lazy(_ => import("./pages/HomePage/Home"))
let Watchlist = lazy(_ => import("./pages/WatchlistPage/Watchlist"))
let Explore = lazy(_ => import("./pages/ExplorePage/Explore"))
let Synopsis = lazy(_ => import("./pages/SynopsisPage/Synopsis"))

function Route() {
	useLoader()
	return <Outlet />
}

let router = createBrowserRouter([
	{
		element: <Route />,
		path: "/",
		errorElement:<ErrorPage/>,
		children: [
			{ index: true, element: <Home /> },
			{ path: "watchlist", element: <Watchlist /> },
			{ path: "explore/:format?/:type?/:typeName?/:id?", element: <Explore /> },
			{
				path: ":format/:id/season?/:seasonN?",
				element: <Synopsis />,
				loader: async ({ params }) => {
					let { format, id, seasonN } = params
					let data = await getById(id, format, true)
					if (seasonN) {
						let seasonData = data.seasons.filter(s => s.season_number == seasonN)[0]
						data = {
							...seasonData,
							id: data.id,
							season_id: seasonData.id,
							title: data.name,
							season_name: seasonData.name,
							production_companies: data.production_companies
						}
					}
					return { data, format, seasonN }
				}
			}
		]
	}
])

export default function App() {
	return <RouterProvider router={router} />
}
