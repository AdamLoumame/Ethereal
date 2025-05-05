import { default as SearchSVG } from "@/assets/icons/search.svg?react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import SuggestionsContainer from "./SuggestionsContainer"
import useWindowClick from "../utils/useWindowClick"

export default function SearchBar({ toggle = false, width, style, fullSearch = false }) {
	let [appearSearch, setAppearSearch] = useState(!toggle)
	let [inputValue, setInputValue] = useState("")
	let [doneSetting, setDoneSetting] = useState(false)

	let navigate = useNavigate()
	let location = useLocation()

	let [searchParams, setSearchParams] = useSearchParams()
	useEffect(
		_ => {
			setInputValue(searchParams.get("q") || "")
			setDoneSetting(true)
		},
		[searchParams.get("q")]
	)

	useEffect(
		_ => {
			inputValue = inputValue.trim()
			if (fullSearch && doneSetting && inputValue !== (searchParams.get("q") || "")) {
				if (!location.pathname.split("/").includes("search")) navigate("/explore/search")
				setSearchParams(prev => {
					return { ...Object.fromEntries(prev.entries()), q: inputValue.trim() }
				})
			}
		},
		[inputValue]
	)

	useWindowClick(e => !document.querySelector(".search-bar")?.contains(e.target) && !document.querySelector(".mode")?.contains(e.target) && setAppearSearch(false))

	return (
		<div className='relative' onClick={_ => setAppearSearch(true)}>
			<div className={`${style} search-bar h-fit p-2 mr-1 flex items-center rounded-full duration-300`}>
				<input type='text' className={`${(!toggle || appearSearch) && `${width} mx-2`} duration-300 w-0`} value={inputValue} onInput={e => setInputValue(e.target.value)} />
				<div className='cursor-pointer'>
					<SearchSVG />
				</div>
			</div>
			{appearSearch && !fullSearch && <SuggestionsContainer inputValue={inputValue} style={style} setAppearSearch={setAppearSearch} />}
		</div>
	)
}
