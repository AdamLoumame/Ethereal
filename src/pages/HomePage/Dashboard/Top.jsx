import { useContext } from "react"
import HeroMovie from "./HeroMovie"
import { getTrending } from "@/services/api.js"
import { formatContext } from "./Dashboard"
import useSWR from "swr"
import { image1280 } from "@/utils/constants"

let n = 0
export default function Top() {
	let { format } = useContext(formatContext)
	let trending = useSWR(format, _ => getTrending(format), { suspense: true }).data.results

	return (
		<div className='flex gap-4 basis-3/7 px-8'>
			{trending.slice(n, n + 2).map((trend, i) => {
				return <HeroMovie key={trend.id} id={trend.id} format={format} picture={image1280 + trend.backdrop_path} i={i} />
			})}
		</div>
	)
}
