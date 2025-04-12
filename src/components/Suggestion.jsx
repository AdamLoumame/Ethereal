import { Link} from "react-router-dom"
import { image92 } from "../utils/constants"
import LazyImage from "./LazyImage"
import { useEffect, useRef } from "react"

export default function Suggestion({ data, setActiveSuggestion, active, i }) {
	let imagePath = data.poster_path || data.profile_path
	let date = data.release_date || data.first_air_date
	let type = data.media_type !== "person" && data.media_type
	let name = data.name || data.title

	let suggestion = useRef(null)

	useEffect(_ => {
		suggestion.current.addEventListener("mouseover", _ => setActiveSuggestion(i))
	}, [])

	return (
		<Link to={`/${data.media_type}/${data.id}`} ref={suggestion} className={`suggestion group ${active && "active"} px-4 duration-100 py-2 flex items-center gap-4 snap-star`}>
			<LazyImage styles='h-18 min-w-12 rounded-xl hover:rounded-xl' src={image92 + imagePath} />
			<div className='flex flex-col text-lg w-[70%]'>
				<span className='whitespace-nowrap truncate'>{name}</span>
				<span className='opacity-60'>
					{type} {date && type && "|"} {date?.slice(0, 4)}
				</span>
			</div>
		</Link>
	)
}
