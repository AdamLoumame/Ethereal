import { image400 } from "@/utils/constants"
import { formatDate } from "@/utils/utils"
import Stars from "@/components/Stars"
import ReactMarkdown from "react-markdown"
import SliderProvider from "@/components/SliderProvider"
import { default as LongArrowSvg } from "@/assets/icons/longarrowright.svg?react"
import { default as UserSVG } from "@/assets/icons/user.svg?react"
import useSWR from "swr"
import { getReview } from "@/services/api"
import { useContext } from "react"
import { dataContext } from "./Synopsis"
import { eliminateDuplicates } from "../../utils/utils"

export default function Reviews({ userColor }) {
	let { data, format } = useContext(dataContext)
	let reviews = useSWR(`review${data.id}`, _ => getReview(data.id, format), { suspense: true }).data.results

	reviews = eliminateDuplicates(reviews, "author")
	if (reviews?.length) {
		return (
			<SliderProvider
				id={data.id}
				render={({ slider, showRight, showLeft, scroll }) => (
					<div className='space-y-4'>
						<div className='flex justify-between'>
							<h1 className='text-2xl px-14'>Ratings & Reviews</h1>
							<div className='flex gap-4 h-6 mr-14'>
								<span className={`rotate-180 duration-250 opacity-50 ${showLeft && "cursor-pointer opacity-100"}`} onClick={_ => scroll("l", 0.5)}>
									<LongArrowSvg />
								</span>
								<span className={`duration-250 opacity-50 ${showRight && "cursor-pointer opacity-100"}`} onClick={_ => scroll("r", 0.5)}>
									<LongArrowSvg />
								</span>
							</div>
						</div>
						<div ref={slider} className='flex gap-4 px-14 scroll-px-14 scrollx'>
							{reviews.map(review => (
								<div key={review.id} className='frost space-y-4 p-7 rounded-3xl min-w-240 snap-start'>
									<div className='flex items-center justify-between'>
										<a href={review.url} target='blank' className='flex cursor-pointer items-center gap-3'>
											<div className='size-15 frost2 rounded-full relative overflow-hidden'>
												{review.author_details.avatar_path ? (
													<img className='absolute inset-1/2 -translate-1/2' src={image400 + review.author_details.avatar_path} />
												) : (
													<span className='p-4 absolute inset-0' style={{ color: userColor }}>
														<UserSVG />
													</span>
												)}
											</div>
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
