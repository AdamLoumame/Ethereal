import Header from "./Header"
import Top from "./Top"
import Genres from "./Genres"
import Trend from "@/components/Trend"
import { createContext, useState, Suspense } from "react"
import Loader from "../../../components/Loader"
import useLocalStorage from "../../../utils/useLocalStorage"
import MainExploreHighlight from "../../../components/MainExploreHighlight"

export let formatContext = createContext(null)
export let genreContext = createContext(null)

export default function Dashboard() {
	let [format, setFormat] = useLocalStorage("home-format", "movie")
	let [genre, setGenre] = useState({ movie: { name: "trending" }, tv: { name: "trending" } })

	return (
		<div className='basis-4/5 max-w-4/5 z-100 flex flex-col gap-4 pb-4 max-lg:max-w-full max-lg:block max-lg:space-y-7 max-lg:!min-h-[60vh]'>
			<formatContext.Provider value={{ format, setFormat }}>
				<Header />
				<Suspense
					fallback={
						<div className='flex-center	h-full max-lg:h-265 max-md:h-270 max-sm:h-310 max-xs:h-300 max-2xs:h-270'>
							<Loader />
						</div>
					}>
					<div className='lg:hidden'>
						<MainExploreHighlight format={format} />
					</div>
					<Top />
					<genreContext.Provider value={{ genre, setGenre }}>
						<Suspense
							fallback={
								<div className='flex-center	h-full max-lg:h-145 max-md:h-140 max-sm:h-190 max-xs:h-160 max-2xs:h-130'>
									<Loader />
								</div>
							}>
							<Genres />
							<Trend title={`Trending ${genre[format].id ? `In ${genre[format].name}` : ""}`} format={format} genre={genre[format]} />
						</Suspense>
					</genreContext.Provider>
				</Suspense>
			</formatContext.Provider>
		</div>
	)
}
