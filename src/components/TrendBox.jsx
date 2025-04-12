import Star from "@/components/Star"
import { Link } from "react-router-dom"
import { image342 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"

export default function TrendBox({ trend, format, large }) {
	let title = trend.title ? trend.title : trend.name
	return (
		<Link to={`/${format || trend.media_type}/${trend.id}`} className={`flex flex-col gap-2 ${!large ? "min-w-36 max-w-36" : "min-w-50 max-w-50"} cursor-pointer snap-start`}>
			<LazyImage styles={`h-54 ${!large ? "h-50" : "h-75"}`} src={image342 + trend.poster_path} alt={title} />
			<h1 className='truncate'>{title}</h1>
			<div className='flex items-center gap-2'>
				{trend.vote_average > 0 && (
					<div className='flex items-center gap-2'>
						<span className='w-4'>
							<Star width={`${trend.vote_average * 10}%`} id={trend.id} />
						</span>
						<span className='text-sm opacity-65'>{trend.vote_average.toFixed(1)}</span>
					</div>
				)}
				<span className={`text-sm opacity-65 ${trend.vote_average && "border-gray-300 border-l-1 pl-2"}`}>{trend.first_air_date ? trend.first_air_date?.split("-")[0] : trend.release_date?.split("-")[0]}</span>
			</div>
		</Link>
	)
}
