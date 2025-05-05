import Header from "./Header"
import Top from "./Top"
import Genres from "./Genres"
import Trend from "@/components/Trend"
import { createContext, useState, Suspense } from "react"
import Loader from "../../../components/Loader"

export let formatContext = createContext(null)
export let genreContext = createContext(null)

export default function Dashboard() {
	let [format, setFormat] = useState("movie")
	let [genre, setGenre] = useState({ movie: { name: "trending" }, tv: { name: "trending" } })

	return (
		<div className='basis-4/5 max-w-4/5 z-10 flex flex-col gap-4'>
			<formatContext.Provider value={{ format, setFormat }}>
				<Header />
				<Suspense
					fallback={
						<div className='flex-center	h-full'>
							<Loader />
						</div>
					}>
					<Top />
					<genreContext.Provider value={{ genre, setGenre }}>
						<Genres />
						<Trend title={`Trending ${genre[format].id ? `In ${genre[format].name}` : ""}`} format={format} genre={genre[format]} />
					</genreContext.Provider>
				</Suspense>
			</formatContext.Provider>
		</div>
	)
}
