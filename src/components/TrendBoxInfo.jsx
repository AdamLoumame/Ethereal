import Star from "./Star"

export default function TrendBoxInfo({ data }) {
	return (
		<>
			{data?.vote_average > 0 && (
				<div className='flex items-center gap-2'>
					<span className='w-4'>
						<Star width={`${data?.vote_average * 10}%`} id={data?.id} />
					</span>
					<span className='opacity-65'>{data?.vote_average.toFixed(1)}</span>
				</div>
			)}
			<span className={`opacity-65 ${data?.vote_average && "border-gray-300 border-l-1 pl-2"}`}>{data?.first_air_date?.split("-")[0] || data?.release_date?.split("-")[0]}</span>
		</>
	)
}
