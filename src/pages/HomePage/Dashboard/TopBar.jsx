import { useContext, useEffect, useState } from "react"
import { formatContext } from "./Dashboard"
import { default as SearchSVG } from "/src/assets/icons/search.svg?react"

export default function TopBar() {
	let { format, setFormat } = useContext(formatContext)
	let [appearSearch, setAppearSearch] = useState(false)

	useEffect(_ => {
		let hideSearch = e => !document.querySelector(".top-bar").contains(e.target) && !document.querySelector(".mode").contains(e.target) && setAppearSearch(false)
		window.addEventListener("click", hideSearch)

		return _ => window.removeEventListener("click", hideSearch)
	})

	return (
		<div className='top-bar box flex items-center w-fit rounded-4xl gap-4 mx-auto'>
			<span onClick={_ => setFormat("movie")} className={`${format !== "movie" && "text-[#8f9193]"} duration-200 cursor-pointer py-3 ml-6`}>
				Movie
			</span>
			<span onClick={_ => setFormat("tv")} className={`${format !== "tv" && "text-[#8f9193]"} duration-200 cursor-pointer py-3`}>
				Serie
			</span>
			<div className='box2 h-fit p-2 mr-1 flex items-center rounded-full'>
				<input type='text' className={`search-bar ${appearSearch && "w-40 mx-2"} caret-textDark dark:caret-textLight duration-300 w-0`} />
				<div className='cursor-pointer' onClick={_ => setAppearSearch(true)}>
					<SearchSVG />
				</div>
			</div>
		</div>
	)
}
