import { useContext, useState } from "react"
import useSWR from "swr"
import { dataContext } from "./Synopsis"
import LazyImage from "@/components/LazyImage"
import Slider from "@/components/Slider"
import { getSeason } from "../../services/api"
import { image300 } from "../../utils/constants"
import ModalEpisodeDetails from "../../components/ModalEpisodeDetails"

export default function Episodes() {
	let { data, seasonN } = useContext(dataContext)

	let { data: seasonData } = useSWR(`season${data.id + seasonN}`, _ => getSeason(data.id, seasonN), { suspense: true })

	let [showModalEpisode, setShowModalEpisode] = useState(false)
	let [episodeData, setEpisodeData] = useState()

	if (seasonData.episodes.length) {
		return (
			<div>
				<h1 className='text-2xl px-14 mb-4'>{seasonData.episodes.length} Episodes</h1>
				<Slider id={data.id} addP>
					{seasonData.episodes.map((ep, i) => (
						<div
							key={ep.id}
							onClick={_ => {
								setShowModalEpisode(true)
								setEpisodeData(ep)
							}}
							className='min-w-71 space-y-4 cursor-pointer snap-start'>
							<LazyImage styles='h-40' src={image300 + ep.still_path} alt={ep.name} />
							<div className='flex gap-1 flex-col text-center'>
								<span className='truncate'>{ep.name}</span>
								<span className='text-xs opacity-60'>Episode {i + 1}</span>
							</div>
						</div>
					))}
				</Slider>
				{showModalEpisode && <ModalEpisodeDetails setShowModalEpisode={setShowModalEpisode} episodeData={episodeData} />}
			</div>
		)
	}
}
