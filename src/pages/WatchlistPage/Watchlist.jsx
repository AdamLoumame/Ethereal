import { Suspense } from "react"
import Head from "../../components/Head"
import WatchListSwiper from "./WatchListSwiper"
import Loader from "../../components/Loader"
import { useMemo, useState } from "react"
import SliderProvider from "../../components/SliderProvider"
import useLocalStorage from "../../utils/useLocalStorage"
import { default as LongArrowSvg } from "@/assets/icons/longarrowright.svg?react"
import Footer from "../../components/Footer"

export default function Watchlist() {
	let [watchlist] = useLocalStorage("watchlist", [])
	let [page, setPage] = useState(0)
	let canPageIncrease = useMemo(_ => page + 1 < Math.ceil(watchlist.length / 10), [page])
	let canPageDecrease = useMemo(_ => page >= 1, [page])

	let [loaded, setLoaded] = useState(false)
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<div>
				<div className='noise fixed inset-0 size-full' />
				<Head fullSearch searchStyle='border-1 frost border-inherit' mode />
				<SliderProvider
					id={`watchlist${page}`}
					deps={loaded}
					render={({ slider, showRight, showLeft, scroll }) => (
						<>
							<div className='flex justify-between items-center mt-12 mb-10'>
								<h1 className='text-4xl px-14'>Your Watchlist</h1>
								<div className='flex gap-4 h-6 mr-14'>
									<span className={`rotate-180 duration-250 opacity-50 ${showLeft && "cursor-pointer opacity-100"}`} onClick={_ => scroll("l", 0.5)}>
										<LongArrowSvg />
									</span>
									<span className={`duration-250 opacity-50 ${showRight && "cursor-pointer opacity-100"}`} onClick={_ => scroll("r", 0.5)}>
										<LongArrowSvg />
									</span>
								</div>
							</div>
							<div ref={slider} className='flex gap-4 px-14 scroll-px-14 scrollx'>
								<Suspense
									fallback={
										<div className='flex-center h-120 w-full'>
											<Loader />
										</div>
									}>
									<WatchListSwiper watchlist={watchlist} page={page} setLoaded={setLoaded} />
								</Suspense>
							</div>
							{watchlist.length > 10 && (
								<div className='flex justify-end items-center px-14 gap-3 text-xl h-22 group'>
									<div className='flex flex-col gap-1 duration-300  opacity-0 group-hover:opacity-100'>
										<span className={`size-5 -rotate-z-90 opacity-55 ${canPageIncrease && "hover:opacity-100 cursor-pointer"} duration-7`} onClick={_ => canPageIncrease && setPage(prev => prev + 1)}>
											<LongArrowSvg />
										</span>
										<span className={`size-5 rotate-z-90 opacity-55 ${canPageDecrease && "hover:opacity-100 cursor-pointer"} duration-75`} onClick={_ => canPageDecrease && setPage(prev => prev - 1)}>
											<LongArrowSvg />
										</span>
									</div>
									<div className='flex items-center'>
										{page + 1} <span className='text-4xl font-light mx-.5'> / </span> {Math.ceil(watchlist.length / 10)}
									</div>
								</div>
							)}
							{!watchlist[0] && <h1 className='px-14.5 text-xl opacity-80'>You don't have any items in your watchlist yet. Add items you're interested in to keep track of them easily.</h1>}
						</>
					)}
				/>
			</div>
			<Footer style='frost' />
		</div>
	)
}
