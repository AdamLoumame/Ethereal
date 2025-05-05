import { useContext } from "react"
import { dataContext } from "./Synopsis"
import Slider from "@/components/Slider"
import CastBox from "./CastBox"
import { eliminateDuplicates } from "../../utils/utils"

export default function Cast() {
	let { data } = useContext(dataContext)

	let cast = eliminateDuplicates(data.credits.cast, "id")
	return (
		<div className='space-y-4'>
			<h1 className='text-2xl px-14'>Cast of {data.title || data.name}</h1>
			<div className=''>
				<Slider id={data.id} addP>
					{cast.map(cast => (
						<CastBox key={cast.id} castData={cast} />
					))}
				</Slider>
			</div>
		</div>
	)
}
