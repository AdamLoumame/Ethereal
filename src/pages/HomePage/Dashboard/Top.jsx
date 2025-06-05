import { Suspense, useContext, useMemo } from "react"
import HeroMovie from "./HeroMovie"
import { getDetails } from "@/services/api.js"
import { formatContext } from "./Dashboard"
import useSWR from "swr"
import { image780 } from "../../../utils/constants"

export default function Top() {
	let { format } = useContext(formatContext)
	let n = useMemo(_ => Math.floor(Math.random() * 18), [])
	let trending = useSWR(format, _ => getDetails(format), { suspense: true }).data.results

	return (
		<div className='flex gap-4 basis-3/7 px-8 max-lg:h-70'>
			{trending.slice(n, n + 2).map((trend, i) => {
				return <HeroMovie key={trend.id} id={trend.id} format={format} picture={image780 + trend.backdrop_path} i={i} />
			})}
		</div>
	)
}
