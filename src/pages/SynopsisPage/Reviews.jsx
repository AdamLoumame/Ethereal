import { image400 } from "@/utils/constants"
import LazyImage from "@/components/LazyImage"
import { formatDate } from "@/utils/utils"
import Stars from "@/components/Stars"
import ReactMarkdown from "react-markdown"
import SliderProvider from "@/components/SliderProvider"
import { default as LongArrowSvg } from "@/assets/icons/long-arrow-right.svg?react"
import { default as UserSVG } from "@/assets/icons/user.svg?react"
import useSWR from "swr"
import { getReview } from "@/services/api"
import { useContext } from "react"
import { dataContext } from "./Synopsis"

export default function Reviews({ userColor }) {
	let { data, format } = useContext(dataContext)
	let reviews = useSWR(`review${data.id}`, _ => getReview(data.id, format), { suspense: true }).data.results

	if (reviews?.length) {
		return (
			<SliderProvider
				id={data.id}
				render={({ slider, showRight, showLeft, scroll }) => (
					<div className='space-y-4'>
						<div className='flex justify-between'>
							<h1 className='section-title'>Ratings & Reviews</h1>
							<div className='flex gap-4 h-6 mr-14'>
								<span className={`rotate-180 duration-250 opacity-50 cursor-pointer ${showLeft && "opacity-100"}`} onClick={_ => scroll("l", 0.5)}>
									<LongArrowSvg />
								</span>
								<span className={`duration-250 opacity-50 cursor-pointer ${showRight && "opacity-100"}`} onClick={_ => scroll("r", 0.5)}>
									<LongArrowSvg />
								</span>
							</div>
						</div>
						<div ref={slider} className='flex gap-4 px-14 scroll-px-14 scrollx'>
							{reviews.map(review => (
								<div key={review.id} className='frost space-y-4 p-7 rounded-3xl min-w-240 snap-start'>
									<div className='flex items-center justify-between'>
										<a href={review.url} target='blank' className='flex cursor-pointer items-center gap-3'>
											<LazyImage
												styles='size-15 hover:!rounded-full rounded-full p-4'
												src={image400 + review.author_details.avatar_path}
												FallBack={_ => (
													<span style={{ color: userColor }}>
														<UserSVG />
													</span>
												)}
											/>
											<div>
												<span className='block leading-none font-semibold text-2xl'>{review.author}</span>
												<span className='block opacity-60 text-sm'>{formatDate(review.created_at.slice(0, 10))}</span>
											</div>
										</a>
										{review.author_details.rating && (
											<div className='flex gap-0.5 w-35 opacity-70'>
												<Stars rating={review.author_details.rating} id={review.id} />
											</div>
										)}
									</div>
									<div className='text-md mb-0.5 opacity-95 leading-6 font-sans truncate line-clamp-10 whitespace-normal space-y-4'>
										<ReactMarkdown>{review.content.replace(/<[^>]*>/g, "")}</ReactMarkdown>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			/>
		)
	}
}
