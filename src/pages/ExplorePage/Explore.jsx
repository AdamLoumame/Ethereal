import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Head from "../../components/Head"
import Footer from "../../components/Footer"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import InfiniteGrid from "./InfiniteGrid"
import FilterOption from "../../components/FilterOption"
import { capitalize, toggleParam } from "../../utils/utils"
import { getGenre } from "../../services/api"
import useSWR from "swr"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import useWindowClick from "../../utils/useWindowClick"
import { formats, periods } from "../../utils/constants"
import ScrollToTop from "../../components/ScrollTop"
import MainExploreHighlight from "./MainExploreHighlight"
import Trend from "../../components/Trend"
import Loader from "../../components/Loader"

export default function Explore() {
	let { format, type, typeName, id } = useParams()
	let footerRef = useRef(null)

	let navigate = useNavigate()
	let [searchParams, setSearchParams] = useSearchParams()
	useEffect(
		_ => {
			if (!searchParams.get("q") && format === "search") navigate("/explore")
		},
		[searchParams.get("q")]
	)

	let filters = Object.values(Object.fromEntries(searchParams.entries()))
	let [showFilters, setShowFilters] = useState(false)
	let [animateFiltersNumber, setAnimateFiltersNumber] = useState(false)
	let filterNumberRef = useRef(null)
	useEffect(
		_ => {
			setShowFilters(true)
			setAnimateFiltersNumber(true)
			setTimeout(_ => {
				setShowFilters(false)
				setAnimateFiltersNumber(false)
			}, 2500)
		},
		[searchParams.get("genre"), searchParams.get("format"), searchParams.get("period")]
	)
	useWindowClick(e => !filterNumberRef.current?.contains(e.target) && setShowFilters(false))

	let genres = useSWR(`genre${searchParams.get("format")}`, _ => getGenre(searchParams.get("format")), { suspense: true }).data.genres
	return (
		<>
			<ScrollToTop />
			<div className='noise fixed inset-0 size-full' />
			<Head fullSearch style='border-1 frost border-inherit' mode />
			{!format && (
				<div className='space-y-15'>
					<Suspense
						fallback={
							<div className='flex-center h-120'>
								<Loader />
							</div>
						}>
						<MainExploreHighlight />
					</Suspense>
					<Trend title='Trending Movies' format='movie' large addP />
					<Trend title='Trending TV Shows' format='tv' large addP />
					<Trend title='Top Rated Movies' format='movie' large addP topRated />
					<Trend title='Top Rated TV Shows' format='tv' large addP topRated />
					<Trend title='Upcomming Movies' format='movie' large addP upcoming />
					<Trend title='Now Playing Movies' format='movie' large addP nowPlaying />
					<Trend title='Airing TV Shows' format='tv' large addP airing />
				</div>
			)}
			{format === "search" && (
				<div className='flex gap-2 frost z-100 items-center py-4 px-5 sticky top-30 border-1 rounded-4xl mb-10 mx-14 mt-12'>
					<FilterOption option='genre' filters={genres} fallback={"chose a format to change the genre"} />
					<FilterOption option='format' filters={formats} />
					<FilterOption option='period' filters={searchParams.get("format") !== "person" ? periods : undefined} fallback={"change  person"} />
					<div ref={filterNumberRef} className='relative size-11 ml-auto'>
						<span
							className={`button active size-full flex-center cursor-pointer rounded-full before:size-8/10 before:rounded-full before:absolute before:inset-1/2 before:hidden before:-translate-1/2 before:outline-1 before:outline-inherit before:animate-ping before:duration-800 ${filters[0] && animateFiltersNumber && "before:!block"}`}
							onClick={_ => setShowFilters(prev => !prev)}>
							{filters.length}
						</span>
						{filters[0] && (
							<div className={`absolute right-0 top-16/10 p-5 pointer-events-none rounded-3xl border-1 frost flex flex-wrap items-start justify-start gap-4 opacity-0 duration-100 ${showFilters && "opacity-100 !pointer-events-auto"}`}>
								{filters.map(filter => (
									<span key={filter} onClick={_ => toggleParam(filter, searchParams, setSearchParams)} className='text-xl relative cursor-pointer flex items-center gap-1 whitespace-nowrap'>
										<span className='size-6 min-w-6 min-h-6'>
											<FilledStar3SVG />
										</span>
										{genres?.filter(genres => genres.id == filter)[0]?.name || formats.filter(format => format.id == filter)[0]?.name || periods.filter(period => period.id == filter)[0]?.name || filter}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			)}
			{format !== "search" && format && <h1 className='text-4xl mb-10 relative w-fit px-14 mt-12'>{`${type !== "production" ? "Trending " : ""}${capitalize(typeName || "")}${format === "movie" ? " Movies" : " TV Shows"}`}</h1>}
			{format && <InfiniteGrid observedEl={footerRef} format={format} type={type} id={id} />}
			<div ref={footerRef}>
				<Footer style='frost' />
			</div>
		</>
	)
}
