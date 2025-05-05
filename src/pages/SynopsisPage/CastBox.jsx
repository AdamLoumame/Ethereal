import { image342 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"
import { Link } from "react-router-dom"

export default function CastBox({ castData }) {
	return (
		<Link to={`/person/${castData.id}`} className='flex flex-col gap-2 max-w-36 cursor-pointer snap-start group'>
			<LazyImage styles='min-w-36 h-54' src={image342 + castData.profile_path} />
			<div className='flex flex-col gap-0.5'>
				<span className='text-center truncate text-sm'>{castData.name}</span>
				<span className='opacity-60 truncate text-center text-xs'>{castData.character}</span>
			</div>
		</Link>
	)
}
