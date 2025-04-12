import Slider from "@/components/Slider"
import { useContext, useState } from "react"
import { dataContext } from "./Synopsis"
import SeasonBox from "./SeasonBox"

export default function Seasons() {
	let { data } = useContext(dataContext)

	return (
		<div className='space-y-4'>
			<h1 className='section-title'>
				{data.seasons.length} Season{data.seasons.length > 1 && "s"}
			</h1>
			<Slider id={data.id} addP>
				{data.seasons.map(s => (
					<SeasonBox key={s.id} id={data.id} seasonData={s} poster={s.poster_path || data.poster_path} />
				))}
			</Slider>
		</div>
	)
}
