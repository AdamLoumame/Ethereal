import { lazy, Suspense, useContext } from "react"
import { genreContext } from "./Dashboard"
import { capitalize } from "../../../utils/utils"

export default function GenreBox({ genre, format }) {
	let { genre: activeGenre, setGenre } = useContext(genreContext)
	let name = genre.name.split("&").reverse()[0].trim().toLowerCase().replaceAll(" ", "-")
	let SVG = lazy(_ => import(`/src/assets/icons/${name}.svg?react`))

	return (
		<div
			className={`${activeGenre[format].name === genre.name && "active scale-105 shadow-sm"} genre my-2 snap-start button h-18 max-lg:h-23 max-lg:min-w-48 max-lg:max-w-48 max-lg:text-2xl max-lg:rounded-4xl border-transparent cursor-pointer rounded-3xl min-w-40 max-w-40 flex items-center justify-center gap-2`}
			onClick={_ =>
				setGenre(prev => {
					return { movie: format === "movie" ? genre : prev.movie, tv: format === "tv" ? genre : prev.tv }
				})
			}>
			<Suspense>
				<span className='size-6'>
					<SVG />
				</span>
			</Suspense>
			<h1 className='text-center'>{capitalize(name === "science-fiction" ? "Sci-Fi" : name)}</h1>
		</div>
	)
}
