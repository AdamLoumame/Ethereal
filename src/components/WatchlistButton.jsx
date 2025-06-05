import { default as AddWatchlistSVG } from "@/assets/icons/addwatchlist.svg?react"
import { default as RemoveWatchlistSVG } from "@/assets/icons/removewatchlist.svg?react"
import useLocalStorage from "../utils/useLocalStorage"

export default function WatchlistButton({ id, format }) {
	let [watchlist, setWatchlist] = useLocalStorage("watchlist", [])
	let added = watchlist.filter(fav => fav.id === id)[0]

	return (
		<div className='button flex !border-inherit !text-inherit items-center gap-2.5 active cursor-pointer font-semibold rounded-3xl w-fit p-4 relative z-40' onClick={_ => setWatchlist(prev => (prev.map(fav => fav.id).includes(id) ? prev.filter(fav => fav.id !== id) : [...prev, { id, format }]))}>
			<div className='w-6 text-inherit'>{added ? <RemoveWatchlistSVG /> : <AddWatchlistSVG />}</div>
			{added ? "Remove from Watchlist" : "Add To Watchlist"}
		</div>
	)
}
