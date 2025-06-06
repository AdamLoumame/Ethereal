import { default as SearchSVG } from "@/assets/icons/search.svg?react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import SuggestionsContainer from "./SuggestionsContainer"
import useWindowClick from "../utils/useWindowClick"
import useLocalStorage from "../utils/useLocalStorage"

export default function SearchBar({ toggle = false, width, style, fullSearch = false, focused, setFocused }) {
	let [appearSearch, setAppearSearch] = useState(!toggle)
	let [inputValue, setInputValue] = useState("")
	let [doneSetting, setDoneSetting] = useState(false)

	let [_, setLastUrl] = useLocalStorage("lastUrl", "/explore")
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
				if (!location.pathname.includes("search")) {
					setLastUrl(location.pathname)
					navigate("/explore/search")
				}
				setSearchParams(prev => {
					return { ...Object.fromEntries(prev.entries()), q: inputValue.trim() }
				})
			}
		},
		[inputValue]
	)

	useEffect(_ => {
		if (!focused && searchParams.get("q")) document.querySelector(".search-input").focus()
	}, [])

	useWindowClick(e => !document.querySelector(".search-bar")?.contains(e.target) && !document.querySelector(".mode")?.contains(e.target) && setAppearSearch(false))

	return (
		<div className='relative' onClick={_ => setAppearSearch(true)}>
			<div className={`${style} ${toggle && "search-bar"} h-fit p-2 max-sm:p-3 mr-1 flex items-center rounded-full duration-300`}>
				<input type='text' className={`search-input ${(!toggle || appearSearch) && `${width} mx-2`} duration-300 max-sm:text-2xl max-md:text-lg w-0 ${focused && "max-sm:!w-[75vw]"}`} onFocus={_ => setFocused(true)} onBlur={_ => setFocused(false)} value={inputValue} onInput={e => setInputValue(e.target.value)} />
				<div className='cursor-pointer'>
					<SearchSVG />
				</div>
			</div>
			{(appearSearch || !toggle) && !fullSearch && <SuggestionsContainer inputValue={inputValue} style={style} setAppearSearch={setAppearSearch} location={location} setLastUrl={setLastUrl} />}
		</div>
	)
}
