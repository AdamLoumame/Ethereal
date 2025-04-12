import { lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, Outlet, RouterProvider, useNavigation } from "react-router-dom"
import "nprogress/nprogress.css"

let Home = lazy(_ => import("./pages/HomePage/Home"))
let Watchlist = lazy(_ => import("./pages/WatchlistPage/Watchlist"))
let Explore = lazy(_ => import("./pages/ExplorePage/Explore"))
let Synopsis = lazy(_ => import("./pages/SynopsisPage/Synopsis"))

function Route() {
	let nav = useNavigation()
	useEffect(_ => console.log(nav.state), [nav])

	return <Outlet />
}
let router = createBrowserRouter([
	{
		element: <Route />,
		path: "/",
		children: [
			{ index: true, element: <Home /> },
			{ path: "watchlist", element: <Watchlist /> },
			{ path: "explore", element: <Explore /> },
			{ path: ":format/:id", element: <Synopsis /> },
			{ path: ":format/:id/season/:seasonN", element: <Synopsis /> }
		]
	}
])

export default function App() {
	return <RouterProvider router={router} />
}
