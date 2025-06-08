import useSWR from "swr"
import { getById, getDetails } from "@/services/api"
import { image1280 } from "@/utils/constants"
import { useLayoutEffect, useMemo, useRef } from "react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import { getAvrColor } from "@/utils/utils"
import Stars from "@/components/Stars"
import WatchlistButton from "@/components/WatchlistButton"

export default function MainExploreHighlight({ format }) {
	let imageStarRef = useRef(null)
	let mainImageRef = useRef(null)

	let n = useMemo(_ => Math.floor(Math.random() * 20), [])
	let { data } = useSWR(
		`trendExplore${format + n}`,
		async _ => {
			let trending = (await getDetails(format))?.results
			return getById(trending.filter(trend => trend.backdrop_path && trend.poster_path)[n].id, format)
		},
		{ suspense: true }
	)
	let { data: color } = useSWR(`color${data.id}`, _ => data && getAvrColor(image1280 + data.backdrop_path), { suspense: true })

	let runtime = data.runtime || data.episode_run_time?.[0]
	let cert = data.release_dates?.results.filter(d => d.iso_3166_1 === "US")[0]?.release_dates.filter(d => d.certification)[0]?.certification
	let date = data.release_date || data.first_air_date || data.air_date

	useLayoutEffect(_ => [imageStarRef, mainImageRef].forEach(img => img.current.classList.remove("lazy-img-loaded")), [format])

	return (
		<div className='relative w-full h-120 max-xs:h-140' style={{ backgroundColor: color?.hex }}>
			<div className='w-fit absolute -top-30 max-md:-top-20 max-sm:-top-12 right-0 z-30 max-xs:hidden' style={{ filter: "drop-shadow(0 25px 50px  var(--dark))" }}>
				<img ref={imageStarRef} className='star-image h-200 max-md:h-160 max-sm:h-130 opacity-0 scale-50 origin-[70%_50%]' src={image1280 + data.poster_path} loading='lazy' onLoad={e => e.target.classList.add("lazy-img-loaded")} />
			</div>
			<div className='size-155 max-md:size-140 absolute -top-10 right-0 z-25 text-light dark:text-dark overflow-hidden max-xs:hidden'>
				<div className='absolute size-full -right-28 max-md:-right-30 max-sm:-right-50'>
					<FilledStar3SVG />
				</div>
			</div>
			<img src={image1280 + data.backdrop_path} ref={mainImageRef} className='main-explore-image h-full absolute top-0 right-0 opacity-0 max-xs:!w-[200%] max-xs:h-auto max-xs:left-1/2 max-xs:-translate-x-1/2' onLoad={e => e.target.classList.add("lazy-img-loaded")} />
			<div className={`h-full w-3/5 max-sm:w-4/5 pl-14 py-20 ${color?.isDark ? "text-textDark" : "text-textLight"} max-xs:!h-auto max-xs:absolute max-xs:bottom-0 max-xs:w-full max-xs:p-10 relative scale-z-100hedd`}>
				<h1 className='text-5xl mb-4'>{data.title || data.name}</h1>
				<div className='flex items-center gap-4 !h-fit max-xs:mb-6'>
					{data.vote_average > 0 && (
						<div className='flex items-center gap-4'>
							<div className='flex gap-1.5 w-54'>
								<Stars rating={data.vote_average} id={data.id} />
							</div>
							<span className='text-lg border-l-1 pl-4 opacity-85'>{data.vote_average.toFixed(1)}</span>
						</div>
					)}
					{date && <span className='my-4'> {date.slice(0, 4)}</span>}
					{cert && <span className='frost rounded-2xl p-2 my-4'>{cert}</span>}
					{runtime && <span className='my-4'>{`${runtime > 59 ? `${Math.floor(runtime / 60)}h` : ""} ${runtime % 60 !== 0 ? `${runtime % 60}min` : ""}`}</span>}
				</div>
				<div className='w-2/3 mt-5 mb-6 line-clamp-3 text-lg max-xs:hidden truncate whitespace-normal'>{data.overview}</div>
				{data && (
					<div className='max-xs:hidden'>
						<WatchlistButton id={data.id} format={format} />
					</div>
				)}
			</div>
		</div>
	)
}
