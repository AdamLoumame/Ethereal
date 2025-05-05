import { useMemo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import Suggestion from "./Suggestion"
import { getSuggestions } from "../services/api"

export default function SuggestionsContainer({ inputValue, style, setAppearSearch }) {
	let [activeSuggestion, setActiveSuggestion] = useState(-1)
	let { data: suggestionsData } = useSWR(inputValue, _ => getSuggestions(inputValue))
	let suggestions = useMemo(_ => suggestionsData?.results.slice(0, 7), [suggestionsData])

	let navigate = useNavigate()

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
				if (e.code === "Enter" && inputValue) {
					let activeIndex = activeSuggestion === -1 ? 0 : activeSuggestion
					navigate((suggestionsData?.results.length > 7 && activeSuggestion === -1) || !suggestions?.length ? `/explore/search?q=${inputValue}` : `/${suggestions[activeIndex].media_type}/${suggestions[activeIndex].id}`)
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
		<div onMouseLeave={_ => setActiveSuggestion(-1)} className={`${suggestions?.[0] && style} flex flex-col absolute top-[110%] left-0 w-full rounded-2xl overflow-hidden z-100 overflow-y-auto`}>
			{suggestions?.map((suggestion, i) => (
				<Suggestion key={suggestion.id} data={suggestion} setActiveSuggestion={setActiveSuggestion} active={activeSuggestion === i} i={i} />
			))}
		</div>
	)
}
