import { lazy } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

let Home = lazy(_ => import("./pages/HomePage/Home"))
let Favorite = lazy(_ => import("./pages/FavoritesPage/Favorite"))
let Explore = lazy(_ => import("./pages/ExplorePage/Explore"))
let Synopsis = lazy(_ => import("./pages/SynopsisPage/Synopsis"))

let router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/favorite", element: <Favorite /> },
	{ path: "/explore", element: <Explore /> },
	{ path: "/synopsis/:id", element: <Synopsis /> }
])

export default function App() {
	return <RouterProvider router={router} />
}
