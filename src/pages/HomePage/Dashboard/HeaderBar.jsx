import { useContext } from "react"
import { formatContext } from "./Dashboard"
import SearchBar from "@/components/SearchBar"

export default function HeaderBar() {
	let { format, setFormat } = useContext(formatContext)

	return (
		<div className='box flex items-center w-fit rounded-4xl gap-4 mx-auto z-100 max-lg:mr-auto max-lg:mx-0'>
			<span onClick={_ => setFormat("movie")} className={`${format !== "movie" && "text-[#8f9193]"} duration-200 cursor-pointer py-3 ml-6 `}>
				Movie
			</span>
			<span onClick={_ => setFormat("tv")} className={`${format !== "tv" && "text-[#8f9193]"} duration-200 cursor-pointer py-3 max-lg:mr-6`}>
				Serie
			</span>
			<div className='max-lg:hidden'>
				<SearchBar toggle width={"w-60"} style='dark:bg-[#d7d4e2] bg-[#343434] dark:text-textLight text-textDark bg-sec-dark dark:caret-textLight caret-textDark' />
			</div>
		</div>
	)
}
