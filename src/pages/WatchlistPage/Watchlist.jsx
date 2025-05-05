import { Suspense } from "react"
import Head from "../../components/Head"
import WatchListSwiper from "./WatchListSwiper"
import Loader from "../../components/Loader"

export default function Watchlist() {
	return (
		<>
			<Head fullSearch style='border-1 frost border-inherit' mode />
			<Suspense
				fallback={
					<div className='h-[80vh] flex-center'>
						<Loader />
					</div>
				}>
				<WatchListSwiper />
			</Suspense>
		</>
	)
}
