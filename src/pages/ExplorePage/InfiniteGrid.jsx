import TrendBox from "@/components/TrendBox"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { eliminateDuplicates } from "@/utils/utils"
import { getSuggestions, getDetails } from "../../services/api"
import { useNavigation, useSearchParams } from "react-router-dom"
import Loader from "../../components/Loader"

export default function InfiniteGrid({ observedEl, format, type, id }) {
	let [page, setPage] = useState(1)
	let [items, setItems] = useState([])
	let [done, setDone] = useState(false)
	let [isFooterIntersecting, setIsFooterIntersecting] = useState(true)
	let [footerIntersectionCount, setFooterIntersectionCount] = useState(0)
	let isPageLoading = useNavigation().state === "loading"

	let [searchParams, _] = useSearchParams()

	let { data: newestPage, isLoading } = useSWR([page, format, id, searchParams.get("q"), searchParams.get("format"), searchParams.get("genre"), searchParams.get("period")], _ => {
		if (!isPageLoading && !done) {
			if (format === "search" && searchParams.get("q")) {
				return getSuggestions(searchParams.get("q"), searchParams.get("format") || "", searchParams.get("genre") || "", searchParams.get("period") || "", page)
			}
			if (format !== "search") {
				return getDetails(format, page, type === "genre" ? id : "", type === "production" ? id : "")
			}
		}
		return ""
	})

	useEffect(
		_ => {
			if (!isPageLoading) {
				setItems([])
				setPage(1)
				setFooterIntersectionCount(0)
				setIsFooterIntersecting(true)
				setDone(false)
			}
		},
		[searchParams.get("q"), searchParams.get("format"), searchParams.get("genre"), searchParams.get("period")]
	)

	useEffect(
		_ => {
			setItems(prev => (newestPage?.results ? eliminateDuplicates([...prev, ...newestPage.results.filter(el => el.media_type !== "collection")], "id") : prev))
			if (newestPage?.total_results - items.length < 15 || page > 10 * (items.length || 1)) {
				setPage(prev => prev - 1)
				setDone(true)
			}
		},
		[newestPage]
	)

	useEffect(
		_ => {
			if (((newestPage?.total_results - items.length >= 15 && items.length < footerIntersectionCount * 20) || (isFooterIntersecting && (searchParams.get("genre") || searchParams.get("period")))) && !done) setPage(prev => prev + 1)
		},
		[items]
	)

	useEffect(
		_ => {
			let observer = new IntersectionObserver(e => {
				if (!e[0].isIntersecting) setIsFooterIntersecting(false)
				if (!done && items[0] && e[0].isIntersecting) {
					setIsFooterIntersecting(true)
					setFooterIntersectionCount(prev => prev + 1)
					setPage(prev => prev + 1)
				}
			})
			observer.observe(observedEl.current)

			return _ => observedEl.current && observer.unobserve(observedEl.current)
		},
		[done, items[0]]
	)
	console.log(items)

	return (
		<div className='flex flex-wrap gap-y-8 max-w-fit px-auto px-14 min-w-full'>
			{items.map(el => (
				<TrendBox key={el.id} trend={el} format={format} largest />
			))}
			{isLoading && <Loader />}
			{!items.length && done && "No results found"}
		</div>
	)
}
