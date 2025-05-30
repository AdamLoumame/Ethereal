import useSWR from "swr"
import { getDetails } from "@/services/api"
import { default as ArrowSVG } from "@/assets/icons/arrow.svg?react"
import { Link } from "react-router-dom"
import TrendBox from "./TrendBox"
import Slider from "@/components/Slider"
import { eliminateDuplicates } from "../utils/utils"

export default function Trend({ title, format, defaultData = false, defaultId, genre, production, recommendationsId, collectionId, excludedIds = [], addP, large = "unset", topRated = false, upcoming = false, nowPlaying = false, airing = false }) {
	let id = defaultId || genre?.id || production?.id || recommendationsId || collectionId
	let { data: trends } = useSWR(!defaultData && `${id + format}tr${topRated}u${upcoming}np${nowPlaying}air${airing}`, _ => getDetails(format, 1, genre?.id, production?.id, recommendationsId, collectionId, topRated, upcoming, nowPlaying, airing), { suspense: true })
	let results = eliminateDuplicates(defaultData || trends.results?.filter(el => !excludedIds.includes(el.id)) || trends.parts || [], "id")

	if (results.length)
		return (
			<div className='basis-4/7 flex flex-col gap-4'>
				{title && (
					<div className={`${addP ? "px-14" : "px-8"} flex items-center justify-between`}>
						<h1 className='text-2xl'>{title}</h1>
						{results.length >= 19 && !topRated && !upcoming && !nowPlaying && !defaultData && !airing && !recommendationsId && (
							<Link to={`/explore/${format}${production?.id ? `/production/${production.name}/${production.id}` : genre?.id ? `/genre/${genre.name}/${genre.id}` : ""}`} className='flex-center gap-1 z-45'>
								See More
								<span className='size-4 rotate-90'>
									<ArrowSVG />
								</span>
							</Link>
						)}
					</div>
				)}
				<Slider id={id} addP={addP}>
					{results.slice(0, 20).map(trend => (
						<TrendBox key={trend.id} trend={trend} format={format} large={large === "unset" ? results.length <= 2 : large} customSize={collectionId && (results.length <= 2 ? "min-w-50 max-w-50" : "min-w-36 max-w-36")} />
					))}
				</Slider>
			</div>
		)
}
