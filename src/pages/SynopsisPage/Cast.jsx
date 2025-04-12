import { useContext } from "react"
import { dataContext } from "./Synopsis"
import Slider from "@/components/Slider"
import CastBox from "./CastBox"

export default function Cast() {
	let { data } = useContext(dataContext)

	return (
		<div className='space-y-4'>
			<h1 className='section-title'>Cast of {data.title || data.name}</h1>
			<div className=''>
				<Slider id={data.id} addP>
					{data.credits.cast.map(cast => (
						<CastBox key={cast.id} castData={cast} />
					))}
				</Slider>
			</div>
		</div>
	)
}
