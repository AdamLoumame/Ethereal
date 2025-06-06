import { useContext } from "react"
import { getGenre } from "../../../services/api"
import { formatContext } from "./Dashboard"
import useSWR from "swr"
import GenreBox from "./GenreBox"
import Slider from "../../../components/Slider"

let forbiddenGenres = [18, 10749, 10770, 53, 10766]
let trendGenre = { name: "trending" }
export default function Genres() {
	let { format } = useContext(formatContext)

	let genres = useSWR(["genres_data", format], _ => getGenre(format), { suspense: true }).data.genres
	!genres.includes(trendGenre) && genres.unshift(trendGenre)

	return (
		<div className='basis-1/7 z-100 relative'>
			<Slider>{genres.map(genre => !forbiddenGenres.includes(genre.id) && <GenreBox key={genre.name + genre.id} genre={genre} format={format} />)}</Slider>
		</div>
	)
}
