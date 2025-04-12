import { default as SearchSVG } from "@/assets/icons/search.svg?react"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { getSuggestions } from "../services/api"
import Suggestion from "./Suggestion"
import { useNavigate } from "react-router-dom"

export default function SearchBar({ toggle = false, width, style }) {
	let [appearSearch, setAppearSearch] = useState(!toggle)
	let [inputValue, setInputValue] = useState()
	let [activeSuggestion, setActiveSuggestion] = useState(-1)

	let { data: suggestionsData } = useSWR(inputValue, _ => getSuggestions(inputValue))
	let suggestions = useMemo(_ => suggestionsData?.results.slice(0, 7), [suggestionsData])

	let navigate = useNavigate()

	useEffect(_ => {
		let hideSearch = e => !document.querySelector(".search-bar")?.contains(e.target) && !document.querySelector(".mode")?.contains(e.target) && setAppearSearch(false)
		window.addEventListener("click", hideSearch)

		return _ => window.removeEventListener("click", hideSearch)
	}, [])

	useEffect(
		_ => {
			let handleActive = e => {
				if (e.code === "ArrowDown") setActiveSuggestion(prev => (prev === suggestions?.length - 1 ? 0 : prev + 1))
				if (e.code === "ArrowUp") setActiveSuggestion(prev => (prev === 0 ? suggestions?.length - 1 : prev - 1))
			}
			document.addEventListener("keydown", handleActive)

			return _ => {
				setActiveSuggestion(-1)
				document.removeEventListener("keydown", handleActive)
			}
		},
		[suggestions]
	)

	useEffect(
		_ => {
			let handleSubmit = e => {
				if (e.code === "Enter") {
					let activeIndex = activeSuggestion === -1 ? 0 : activeSuggestion
					navigate(`/${suggestions[activeIndex].media_type}/${suggestions[activeIndex].id}`)
					setAppearSearch(false)
					document.querySelector(".search-bar input").blur()
				}
			}
			document.addEventListener("keydown", handleSubmit)

			return _ => document.removeEventListener("keydown", handleSubmit)
		},
		[suggestions, activeSuggestion]
	)

	return (
		<div className='relative' onMouseLeave={_ => setActiveSuggestion(-1)}>
			<div onClick={_ => setAppearSearch(true)} className={`${style} search-bar h-fit p-2 mr-1 flex items-center rounded-full duration-300`}>
				<input type='text' className={`${(!toggle || appearSearch) && `${width} mx-2`} duration-300 w-0`} onInput={e => setInputValue(e.target.value)} />
				<div className='cursor-pointer'>
					<SearchSVG />
				</div>
			</div>
			{appearSearch && (
				<div className={`${style} flex flex-col absolute top-[110%] left-0 w-full rounded-3xl overflow-hidden z-100 overflow-y-auto scrolly`}>
					{suggestions?.map((suggestion, i) => (
						<Suggestion key={suggestion.id} data={suggestion} setActiveSuggestion={setActiveSuggestion} active={activeSuggestion === i} i={i} />
					))}
				</div>
			)}
		</div>
	)
}
