import Header from "./Header"
import Top from "./Top"
import Genres from "./Genres"
import Trend from "./Trend"
import { createContext, useState, Suspense } from "react"

export let formatContext = createContext(null)
export default function Dashboard() {
	let [format, setFormat] = useState("movie")
	return (
		<div className='basis-4/5 z-10 flex flex-col gap-4'>
			<formatContext.Provider value={{ format, setFormat }}>
				<Header />
				<Suspense fallback="ddd">
					<Top />
				</Suspense>
				<Genres />
			</formatContext.Provider>
			<Trend />
		</div>
	)
}
