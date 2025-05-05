import Star from "@/components/Star"
import { Link, useSearchParams } from "react-router-dom"
import { image342, image780 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"

export default function TrendBox({ trend, format, large = false, largest = false }) {
	let title = trend.title ? trend.title : trend.name
	if (format === "search") format = trend.media_type || useSearchParams()[0].get("format")

	return (
		<Link to={`/${format || trend.media_type}/${trend.id}`} className={`z-10 flex flex-col group gap-2 ${largest ? "w-1/5 p-2" : large ? "min-w-50 max-w-50" : "min-w-36 max-w-36"} cursor-pointer snap-start ${largest && "text-center text-xl"}`}>
			<LazyImage styles={largest ? "pt-[150%]" : large ? "h-75" : "h-54"} src={(largest ? image780 : image342) + (trend.poster_path || trend.profile_path)} alt={title} />
			<div className={`space-y-2 ${largest && "space-y-1"}`}>
				<h1 className='truncate'>{title}</h1>
				<div className={`flex items-center gap-2 text-sm ${largest && "justify-center !text-lg"}`}>
					{trend.vote_average > 0 && (
						<div className='flex items-center gap-2'>
							<span className='w-4'>
								<Star width={`${trend.vote_average * 10}%`} id={trend.id} />
							</span>
							<span className='opacity-65'>{trend.vote_average.toFixed(1)}</span>
						</div>
					)}
					<span className={`opacity-65 ${trend.vote_average && "border-gray-300 border-l-1 pl-2"}`}>{trend.first_air_date?.split("-")[0] || trend.release_date?.split("-")[0]}</span>
				</div>
			</div>
		</Link>
	)
}
