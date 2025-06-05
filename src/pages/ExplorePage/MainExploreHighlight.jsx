import useSWR from "swr"
import { getById, getDetails } from "../../services/api"
import { image1280 } from "../../utils/constants"
import { useMemo } from "react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import { getAvrColor } from "../../utils/utils"
import Stars from "../../components/Stars"
import WatchlistButton from "../../components/WatchlistButton"

export default function MainExploreHighlight() {
	let n = useMemo(_ => Math.floor(Math.random() * 20), [])
	let { data } = useSWR(
		`trendExplore${n}`,
		async _ => {
			let trending = (await getDetails("movie"))?.results
			return getById(trending.filter(trend => trend.backdrop_path && trend.poster_path)[n].id, "movie")
		},
		{ suspense: true }
	)
	let { data: color } = useSWR(`color${data.id}`, _ => data && getAvrColor(image1280 + data.backdrop_path), { suspense: true })

	let runtime = data.runtime || data.episode_run_time?.[0]
	let cert = data.release_dates?.results.filter(d => d.iso_3166_1 === "US")[0]?.release_dates.filter(d => d.certification)[0]?.certification
	let date = data.release_date || data.first_air_date || data.air_date

	return (
		<div className='relative w-full h-120 overflow-' style={{ backgroundColor: color?.hex }}>
			<div className='w-fit absolute -top-30 right-0 z-30' style={{ filter: "drop-shadow(0 25px 50px  var(--dark))" }}>
				<img
					className='h-200 opacity-0 duration-200 scale-50 origin-[70%_50%]'
					src={image1280 + data.poster_path}
					loading='lazy'
					onLoad={e => e.target.classList.add("lazy-img-loaded")}
					style={{ clipPath: 'path("M332.9994 0C339.4428 179.5176 483.4824 323.5566 663 330C483.4824 336.4434 339.4428 480.4824 332.9994 660C326.5566 480.4824 182.517 336.4434 2.999634 330C182.517 323.5566 326.5566 179.5176 332.9994 0Z")' }}
				/>
			</div>
			<div className='size-150 absolute -top-10 -right-0 z-25 text-light dark:text-dark overflow-hidden'>
				<div className='absolute size-full -right-28'>
					<FilledStar3SVG />
				</div>
			</div>
			<img src={image1280 + data.backdrop_path} className='h-full absolute top-0 -right-0 opacity-1 duration-1000' onLoad={e => e.target.classList.add("lazy-img-loaded")} style={{ maskImage: "linear-gradient(to left, black 0%, transparent 95%)" }} />
			<div className={`h-full w-3/5 pl-14 py-20 ${color?.isDark ? "text-textDark" : "text-textLight"}`}>
				<h1 className='text-5xl mb-4'>{data.title || data.name}</h1>
				<div className='flex items-center gap-4 !h-fit'>
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
				<div className='w-2/3 mt-5 mb-6 line-clamp-3 text-lg truncate whitespace-normal'>{data.overview}</div>
				{data && <WatchlistButton id={data.id} format='movie' />}
			</div>
		</div>
	)
}
