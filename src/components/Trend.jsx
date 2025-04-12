import useSWR from "swr"
import { getTrending } from "@/services/api"
import { default as ArrowSVG } from "@/assets/icons/arrow.svg?react"
import { Link } from "react-router-dom"
import TrendBox from "./TrendBox"
import Slider from "@/components/Slider"

export default function Trend({ title, format, defaultData = false, defaultId, genreId, productionId, castId, recommendationsId, collectionId, excludedIds = [], addP, large = "unset" }) {
	let id = defaultId || genreId || productionId || castId || recommendationsId || collectionId
	let { data: trends } = useSWR(!defaultData && `genre${id + format}`, _ => getTrending(format, genreId, productionId, castId, recommendationsId, collectionId), { suspense: true })

	let results = defaultData || trends.results?.filter(el => !excludedIds.includes(String(el.id))) || trends.parts
	if (results.length)
		return (
			<div className='basis-4/7 flex flex-col gap-4'>
				{title && (
					<div className={`${addP ? "px-14" : "px-8"} flex items-center justify-between`}>
						<h1 className='text-2xl'>{title}</h1>
						{results.length >= 19 && (
							<Link to='/explore' className='flex-center gap-1'>
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
						<TrendBox key={trend.id} trend={trend} format={format} large={large === "unset" ? results.length <= 2 : large} />
					))}
				</Slider>
			</div>
		)
}
