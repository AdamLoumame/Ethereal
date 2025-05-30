import useSWR from "swr"
import { getById } from "../../../services/api"
import { image92 } from "../../../utils/constants"
import { Link } from "react-router-dom"
import TrendBoxInfo from "../../../components/TrendBoxInfo"
import LazyImage from "../../../components/LazyImage"

export default function SideBarLastBrowsed({ id, format }) {
	let { data } = useSWR(`sidebarwatchlist${String(id) + format}`, _ => getById(id, format), { suspense: true })

	return (
		<Link to={`/${format}/${id}`} className='flex group gap-3'>
			<LazyImage src={image92 + data?.poster_path} styles='min-w-12 h-18 !rounded-2xl duration-300 group-hover:!rounded-none' />
			<div className='w-4/5 flex flex-col justify-center gap-2'>
				<h2 className='text-xl truncate max-w-[80%]'>{data?.title || data?.name}</h2>
				<div className='flex gap-2'>
					<TrendBoxInfo data={data} />
				</div>
			</div>
		</Link>
	)
}
