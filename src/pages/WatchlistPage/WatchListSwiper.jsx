import { default as MoreInfoSvg } from "@/assets/icons/moreinfo.svg?react"
import useSWR from "swr"
import { getById } from "../../services/api"
import LazyImage from "../../components/LazyImage"
import { image780 } from "../../utils/constants"
import { eliminateDuplicates, getAvrColor } from "../../utils/utils"
import { Link } from "react-router-dom"
import Star from "../../components/Star"
import { useEffect, useState } from "react"

export default function WatchListSwiper({ watchlist, page, setLoaded }) {
	let [debouncedPage, setDebouncedPage] = useState(page)
	let { data } = useSWR(`watchlist${debouncedPage}`, _ => Promise.all(eliminateDuplicates(watchlist.slice(debouncedPage * 10, (debouncedPage + 1) * 10), "id").map(listed => getById(listed.id, listed.format))), { suspense: true })
	let { data: colors } = useSWR(`watchlistColors${debouncedPage}`, _ => Promise.all(data.map(listed => listed.poster_path && getAvrColor(image780 + listed.poster_path))), { suspense: true })

	useEffect(
		_ => {
			let timer = setTimeout(() => setDebouncedPage(page), 350)

			return _ => clearTimeout(timer)
		},
		[page]
	)
	useEffect(_ => setLoaded(prev => !prev), [data])

	useEffect(_ => console.log(debouncedPage), [debouncedPage])
	console.log(data?.[0]?.poster_path)
	return (
		<>
			{data?.map((listed, i) => (
				<div key={listed.poster_path + String(i)} className='flex h-120	 min-w-200 max-w-200 rounded-3xl overflow-hidden snap-start duration-400' style={{ backgroundColor: colors?.[i]?.hex || "#1A1A1A" }}>
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
							{listed.vote_average && (
								<div className='flex items-center'>
									<span className='size-12 block'>
										<Star width={`${listed.vote_average * 10}%`} id={listed.poster_path} />
									</span>
									<span className='pl-4 ml-4 border-l-1 text-lg'>{listed.vote_average.toFixed(1)}</span>
								</div>
							)}
						</div>
					</div>
					<LazyImage src={image780 + listed.poster_path} styles='w-80 h-full rounded-none' />
				</div>
			))}
		</>
	)
}
