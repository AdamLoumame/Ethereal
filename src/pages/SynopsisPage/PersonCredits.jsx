import { sortBasedOnDate } from "../../utils/utils"
import Filmography from "./Filmography"

export default function PersonCredits({ credits }) {
	let actor = sortBasedOnDate(credits.cast.filter(c => !c.character.toLowerCase().includes("self") && (c.title || c.name)))
	let appearances = sortBasedOnDate(credits.cast.filter(c => c.character.toLowerCase().includes("self") && (c.title || c.name)))
	let departments = [...new Set(credits.crew.map(curr => curr.department))]

	return (
		<div className='px-14'>
			<h1 className='pb-6 text-2xl border-b-1 border-light mb-8'>Filmography</h1>
			<Filmography title='Actor' credit={actor} />
			{appearances[0] && <Filmography title='Appearances' credit={appearances} />}
			{departments.map(d => (
				<Filmography key={d} title={d} credit={sortBasedOnDate(credits.crew.filter(c => c.department === d && (c.title || c.name)))} />
			))}
		</div>
	)
}
