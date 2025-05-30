import Star from "@/components/Star"
import { Link, useSearchParams } from "react-router-dom"
import { image342, image780 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"
import TrendBoxInfo from "./TrendBoxInfo"

export default function TrendBox({ trend, format, large = false, largest = false, customSize = "" }) {
	let title = trend.title ? trend.title : trend.name
	if (format === "search") format = trend.media_type || useSearchParams()[0].get("format")

	return (
		<Link to={`/${format || trend.media_type}/${trend.id}`} className={`z-10 flex flex-col group gap-2 ${customSize ? customSize : largest ? "min-w-1/5 max-w-1/5 p-2" : large ? "min-w-1/6 max-w-1/6" : "min-w-1/8 max-w-1/8"} cursor-pointer snap-start ${largest && "text-center text-xl"}`}>
			<LazyImage styles={"pt-[150%]"} src={(largest ? image780 : image342) + (trend.poster_path || trend.profile_path)} alt={title} />
			<div className={`space-y-2 ${largest && "space-y-1"}`}>
				<h1 className='truncate'>{title}</h1>
				<div className={`flex items-center gap-2 text-sm ${largest && "justify-center !text-lg"}`}>
					<TrendBoxInfo data={trend} />
				</div>
			</div>
		</Link>
	)
}
