import socialLinks from "@/assets/social.json"
import { default as LogoLettersSVG } from "@/assets/icons/logoletters.svg?react"
import { default as StrokeStar1SVG } from "@/assets/icons/strokestar1.svg?react"
import { default as FilledStar1SVG } from "@/assets/icons/filledstar1.svg?react"
import { default as StrokeStar2SVG } from "@/assets/icons/strokestar2.svg?react"
import { default as FilledStar2SVG } from "@/assets/icons/filledstar2.svg?react"
import { default as StrokeStar3SVG } from "@/assets/icons/strokestar3.svg?react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import Menu from "./Menu"
import { useEffect, useState } from "react"

export default function Footer() {
	let [showStar, setShowStar] = useState(false)
	let [left, setLeft] = useState(0)
	let randStarN = Math.floor(Math.random() * 3)
	useEffect(
		_ => {
			setLeft(Math.floor(Math.random() * 25))
		},
		[showStar]
	)

	return (
		<div className='frost2 h-[60vh] overflow-hidden mt-25 border-t-1'>
			<div className='absolute top-0 right-0 w-1/3 pt-14 pr-14 gap-40 flex justify-start'>
				<div className='flex flex-col gap-2'>
					<Menu activeClass='hidden' elClass='text-sm' iconClass='hidden' />
				</div>
				<div className='flex flex-col gap-2 text-sm'>
					{socialLinks.map(s => (
						<span key={s.name} onMouseEnter={_ => setShowStar(true)} onMouseLeave={_ => setShowStar(false)}>
							<a href={s.link} className='group cursor-pointer text-inherit relative w-fit'>
								{s.name}
								<div className='absolute overflow-hidden w-full h-[.5px] top-full left-0'>
									<div className='absolute h-full w-full group-hover:translate-x-full -translate-x-full group-hover:duration-300 bg-[#e8e5f0] ease' />
								</div>
							</a>
						</span>
					))}
				</div>
			</div>
			<span className='absolute -translate-1/2 top-0 left-0 size-200 rounded-full border-1 border-light' />
			<span className='absolute bottom-0 right-0 pr-14 pb-14 w-1/3'>
				<LogoLettersSVG />
			</span>
			<div className={`${showStar && "opacity-100 duration-1000 transition-opacity"} opacity-0 size-20 absolute -translate-1/2`} style={{ left: `${left}rem`, top: `${Math.round(Math.sqrt(625 - left ** 2))}rem` }}>
				<span className='size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2'>{[<StrokeStar1SVG key='1' />, <StrokeStar2SVG key='2' />, <StrokeStar3SVG key='3' />][randStarN]}</span>
				<span className={`${showStar && "top-7/20 left-3/4 duration-800"} size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2`}>{[<FilledStar1SVG key='1' />, <FilledStar2SVG key='2' />, <FilledStar3SVG key='3' />][randStarN]}</span>
			</div>
			<div className='absolute bottom-13.5 left-100 text-sm max-w-1/3 space-y-2'>
				<p>© 2025 Adam Loumame. All rights reserved.</p>
				<p>
					Designed and built by me, data provided by
					<a href='https://www.themoviedb.org' target='blank' className='ml-2 rounded-3xl font-semibold'>
						TMDB
					</a>
				</p>
			</div>
		</div>
	)
}
