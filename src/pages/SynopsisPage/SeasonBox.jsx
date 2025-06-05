import LazyImage from "@/components/LazyImage"
import { image400 } from "@/utils/constants"
import { Link } from "react-router-dom"

export default function Episode({ id, seasonData, poster }) {
	return (
		<Link to={`/tv/${id}/season/${seasonData.season_number}`} className='flex flex-col group max-w-50 gap-4 cursor-pointer snap-start'>
			<LazyImage styles='min-w-50 h-75' src={image400 + poster} />
			<div className='flex flex-col text-sm gap-1'>
				<span className='truncate text-center'>{seasonData.name}</span>
				<span className='opacity-60 text-center truncate'>
					{seasonData.episode_count} Episode{seasonData.episode_count > 1 && "s"}
				</span>
			</div>
		</Link>
	)
}
