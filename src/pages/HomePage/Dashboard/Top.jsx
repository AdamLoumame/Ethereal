import { useContext, Suspense } from "react"
import HeroMovie from "./HeroMovie"
import { getTrending } from "/src/services/api.js"
import { formatContext } from "./Dashboard"
import useSWRImmutable from "swr/immutable"

export default function Top() {
	let { format } = useContext(formatContext)
	let trending = useSWRImmutable("trending_data", _ => getTrending(format), { suspense: true }).data.results
	console.log(trending)

	return (
		<div className='flex gap-4 basis-3/6'>
			<Suspense fallback='ddd'>
				{trending.slice(2, 4).map((trend, i) => (
					<HeroMovie key={trend.id} id={trend.id} picture={`https://image.tmdb.org/t/p/w1280/${trend.backdrop_path}`} basis={`${((i + 3) / 7) * 100}%`} format={format} />
				))}
			</Suspense>
		</div>
	)
}
