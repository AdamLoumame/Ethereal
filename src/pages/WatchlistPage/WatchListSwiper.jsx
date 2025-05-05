import { useMemo, useState } from "react"
import SliderProvider from "../../components/SliderProvider"
import useLocalStorage from "../../utils/useLocalStorage"
import { default as LongArrowSvg } from "@/assets/icons/longarrowright.svg?react"
import { default as MoreInfoSvg } from "@/assets/icons/moreinfo.svg?react"
import useSWR from "swr"
import { getById } from "../../services/api"
import LazyImage from "../../components/LazyImage"
import { image780 } from "../../utils/constants"
import { getAvrColor } from "../../utils/utils"
import { Link } from "react-router-dom"
import Star from "../../components/Star"

export default function WatchListSwiper() {
	let [watchlist] = useLocalStorage("watchlist", [])
	let [page, setPage] = useState(0)
	let { data } = useSWR(`watchlist${page}`, _ => Promise.all(watchlist.slice(page * 20, (page + 1) * 20).map(listed => getById(listed.id, listed.format))), { suspense: true })
	let { data: colors } = useSWR(`watchlistColors${page}`, _ => Promise.all(data.map(listed => listed.poster_path && getAvrColor(image780 + listed.poster_path))), { suspense: true })
	let canPageIncrease = useMemo(_ => page + 1 < Math.ceil(watchlist.length / 20), [page])
	let canPageDecrease = useMemo(_ => page >= 1, [page])

	return (
		<SliderProvider
			id={`watchlist${page}`}
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
						{data?.map((listed, i) => (
							<div key={listed.poster_path} className='flex h-120	 min-w-200 max-w-200 rounded-3xl overflow-hidden snap-start duration-400' style={{ backgroundColor: colors?.[i]?.hex || "#1A1A1A" }}>
								<div className={`h-full w-120 p-12 flex flex-col justify-between ${colors?.[i]?.isDark === false ? "text-textLight" : "text-textDark"}`}>
									<div className='space-y-5'>
										<h1 className='text-3xl'>{listed.title || listed.name}</h1>
										<div className='line-clamp-6 text-lg truncate whitespace-normal'>{listed.overview}</div>
									</div>
									<div className='flex justify-between items-center'>
										<Link to={`/${listed.title ? "movie" : "tv"}/${listed.id}`} className='flex gap-3 items-center'>
											<span className='block size-6'>
												<MoreInfoSvg />
											</span>{" "}
											View Details
										</Link>
										<div className='flex items-center'>
											<span className='size-12 block'>
												<Star width={`${listed.vote_average * 10}%`} id={listed.poster_path} />
											</span>
											<span className='pl-4 ml-4 border-l-1 text-lg'>{listed.vote_average.toFixed(1)}</span>
										</div>
									</div>
								</div>
								<LazyImage src={image780 + listed.poster_path} styles='w-80 h-full rounded-none' />
							</div>
						))}
					</div>
					{watchlist.length > 20 && (
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
								{page + 1} <span className='text-4xl font-light mx-.5'> / </span> {Math.ceil(watchlist.length / 20)}
							</div>
						</div>
					)}
					{!watchlist[0] && <h1 className='px-14.5 text-xl opacity-80'>You don't have any items in your watchlist yet. Add items you're interested in to keep track of them easily.</h1>}
				</>
			)}
		/>
	)
}
