import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { dataContext } from "./Synopsis"
import { image780 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"
import Stars from "@/components/Stars"
import { default as PlaySVG } from "@/assets/icons/play.svg?react"
import { default as CurvedCornerSVG } from "@/assets/icons/curvedcorner.svg?react"
import Tooltip from "@/components/Tooltip"
import Trend from "@/components/Trend"
import { default as CollectionSVG } from "@/assets/icons/collection.svg?react"
import { default as YoutubeSVG } from "@/assets/icons/youtube.svg?react"
import { default as InstagramSVG } from "@/assets/icons/instagram.svg?react"
import { default as IMDBSVG } from "@/assets/icons/imdb.svg?react"
import { default as FacebookSVG } from "@/assets/icons/facebook.svg?react"
import { default as XSVG } from "@/assets/icons/x.svg?react"
import ExpandableText from "@/components/ExpandableText"
import ModalVideo from "@/components/ModalVideo"
import useSWR from "swr"
import { getVideos } from "@/services/api"
import { formatDate, formatYears } from "@/utils/utils"
import WatchlistButton from "../../components/WatchlistButton"

export default function MainOverview() {
	let { data, format, seasonN } = useContext(dataContext)
	let title = data.title || data.name
	let date = data.release_date || data.first_air_date || data.air_date
	let runtime = data.runtime || data.episode_run_time?.[0]
	let cert = useMemo(_ => data?.release_dates?.results.filter(d => d.iso_3166_1 === "US")[0]?.release_dates.filter(d => d.certification)[0]?.certification, [data])
	let director = useMemo(_ => data?.credits?.crew.filter(menber => menber.job === "Director")[0]?.original_name, [data])

	let person = format === "person"

	let [showGenres, setShowGenres] = useState(data.genres?.length <= 2)
	useEffect(_ => setShowGenres(data.genres?.length <= 2), [data])

	let [showVideo, setShowVideo] = useState(false)
	let { data: trailer } = useSWR(!person && `trailer${data.id + (seasonN || "")}`, _ => getVideos(data.id, format, seasonN), { suspense: true })
	trailer = trailer?.filter(vid => vid.type === "Trailer")

	return (
		<>
			<div className='flex relative gap-8 px-14 mt-12'>
				<LazyImage styles='min-w-80 w-80 h-120 shadow-lg hover:!rounded-3xl' src={image780 + (data.poster_path || data.profile_path)} alt={title} />
				<div className='py-2 grow'>
					<h1 className='text-4xl font-semibold'>{title}</h1>
					<span className='opacity-60 text-sm'>
						{director && `Directed by ${director}`}
						{data.known_for_department && `Known For ${data.known_for_department}`}
						{data.season_name}
					</span>
					<div className='flex items-center gap-4 !h-fit'>
						{person && data.birthday && (
							<span className='font-bold my-2'>
								{data.birthday && `Born the ${formatDate(data.birthday)}. `}
								{data.deathday && `Died ${formatDate(data.deathday)}. `}
								{`(${formatYears(data.birthday, data.deathday || "")} years)`}
							</span>
						)}
						{cert && <span className='frost rounded-2xl p-2 my-4'>{cert}</span>}
						{data.episode_count && <span className='frost rounded-2xl px-3 py-2 my-4'> {data.episode_count} Episodes</span>}
						{date && <span className='my-4'> {date.slice(0, 4)}</span>}
						{runtime && <span className='my-4'>{`${runtime > 59 ? `${Math.floor(runtime / 60)}h` : ""} ${runtime % 60 !== 0 ? `${runtime % 60}min` : ""}`}</span>}
						<div>
							{data.genres?.slice(0, showGenres ? undefined : 2).map((genre, i) => (
								<span key={genre.id} className='opacity-70 my-4'>
									{genre.name}
									{i !== data.genres?.length - 1 && ", "}
								</span>
							))}
							{!showGenres && data.genres && (
								<span className='font-semibold cursor-pointer opacity-85' onClick={_ => setShowGenres(true)}>
									and more
								</span>
							)}
						</div>
					</div>
					{data.vote_average > 0 && (
						<div className='flex items-center gap-4'>
							<div className='flex gap-1.5 w-54'>
								<Stars rating={data.vote_average} id={data.id} />
							</div>
							<span className='text-lg border-l-1 pl-4 opacity-85'>{data.vote_average.toFixed(1)}</span>
						</div>
					)}
					{person && (
						<div className='flex gap-4'>
							{data.external_ids.facebook_id && (
								<a className='size-8 opacity-90 hover:opacity-100 duration-200 my-4' href={`https://www.facebook.com/${data.external_ids.facebook_id}`} target='_blank'>
									<FacebookSVG />
								</a>
							)}
							{data.external_ids.instagram_id && (
								<a className='size-8 opacity-90 hover:opacity-100 duration-200 my-4' href={`https://www.instagram.com/${data.external_ids.instagram_id}`} target='_blank'>
									<InstagramSVG />
								</a>
							)}
							{data.external_ids.twitter_id && (
								<a className='size-8 opacity-90 hover:opacity-100 duration-200 my-4' href={`https://twitter.com/${data.external_ids.twitter_id}`} target='_blank'>
									<XSVG />
								</a>
							)}
							{data.external_ids.youtube_id && (
								<a className='size-8 opacity-90 hover:opacity-100 duration-200 my-4' href={`https://www.youtube.com/${data.external_ids.youtube_id}`} target='_blank'>
									<YoutubeSVG />
								</a>
							)}
							{data.external_ids.imdb_id && (
								<a className='size-8 opacity-90 hover:opacity-100 duration-200 my-4' href={`https://www.imdb.com/name/${data.external_ids.imdb_id}`} target='_blank'>
									<IMDBSVG />
								</a>
							)}
						</div>
					)}
					{!person && (
						<div className='flex my-7 gap-3'>
							<WatchlistButton id={data.id} format={format} />
							{trailer[0] && (
								<div
									className='rounded-full button active p-4 cursor-pointer'
									onClick={_ => {
										setShowVideo(true)
									}}>
									<Tooltip tip='Watch Trailer' />
									<div className='size-6'>
										<PlaySVG />
									</div>
								</div>
							)}
						</div>
					)}
					<ExpandableText text={data.overview || data.biography} />
				</div>
				{data.belongs_to_collection && (
					<div className='collection group absolute top-0 right-14 h-20 z-30'>
						<div className='group-hover:rounded-b-none flex ease items-center relative frost duration-220 border-transparent p-4 rounded-3xl grow w-fit'>
							<h2 className='name opacity-0 text-xl overflow-hidden text-left whitespace-nowrap max-w-0'>{data.belongs_to_collection.name}</h2>
							<span className='group-hover:opacity-100 absolute bottom-0 right-full opacity-0 duration-200 text-[#FFFFFF0D] rotate-180'>
								<CurvedCornerSVG />
							</span>
							<span className='size-7'>
								<CollectionSVG />
							</span>
						</div>
						<div className='collection-content group-hover:opacity-100 group-hover:scale-100 group-hover:rounded-tr-none duration-300 opacity-0 scale-0 py-4 rounded-3xl right-0 frost absolute top-15 max-w-[60vw]'>
							<Trend format={format} collectionId={data.belongs_to_collection.id} />
						</div>
					</div>
				)}
			</div>
			{showVideo && <ModalVideo setShowVideo={setShowVideo} vidId={trailer[0].key} />}
		</>
	)
}
