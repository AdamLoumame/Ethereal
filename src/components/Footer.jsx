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
import Copyright from "./Copyright"

export default function Footer({ style = "" }) {
	let [showStar, setShowStar] = useState(false)
	let [left, setLeft] = useState(0)
	let randStarN = Math.floor(Math.random() * 3)
	useEffect(
		_ => {
			setLeft(Math.floor(Math.random() * 25))
		},
		[showStar]
	)

	let [mobileStarsLeft, setMobileStarsLeft] = useState(25)
	useEffect(_ => {
		let mobileLeftInterval = setInterval(_ => setMobileStarsLeft(prev => (prev <= -25 ? 25 : prev - 0.2)), 10)
		return _ => clearInterval(mobileLeftInterval)
	}, [])

	return (
		<div className={`${style} h-[60vh] overflow-hidden mt-25 border-t-1 relative max-lg:h-150 max-md:h-260`} onMouseEnter={_ => setShowStar(true)} onMouseLeave={_ => setShowStar(false)}>
			<div className='absolute top-0 right-0 pt-14 pr-14 gap-40 flex justify-start max-md:flex-col max-md:p-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-115 max-md:h-fit max-md:gap-10'>
				<div className='flex flex-col gap-2 max-md:gap-1.5'>
					<Menu activeClass='hidden' elClass='text-sm max-lg:text-2xl z-10 w-fit max-md:mx-auto' iconClass='hidden' />
				</div>
				<div className='flex flex-col gap-2 text-sm max-md:gap-1.5'>
					{socialLinks.map(s => (
						<span key={s.name} className='max-md:text-center' onMouseEnter={_ => setShowStar(true)} onMouseLeave={_ => setShowStar(false)}>
							<a href={s.link} className='group cursor-pointer text-inherit relative w-fit max-lg:text-2xl z-10'>
								{s.name}
								<div className='absolute overflow-hidden w-full h-[.5px] top-full left-0'>
									<div className='absolute h-full w-full group-hover:translate-x-full -translate-x-full group-hover:duration-300 in-[.no-mode]:bg-textDark dark:bg-textDark bg-textLight ease' />
								</div>
							</a>
						</span>
					))}
				</div>
			</div>
			<span className='absolute -translate-1/2 top-0 left-0 size-200 rounded-full border-1 border-inherit	max-md:left-1/2' />
			<span className='absolute bottom-0 right-0 pr-14 pb-14 w-1/3 max-lg:w-1/2 max-md:w-9/10 max-md:p-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:bottom-30'>
				<LogoLettersSVG />
			</span>
			<div className={`${showStar && "opacity-100 duration-1000 transition-opacity"} opacity-0 size-20 absolute -translate-1/2 max-md:!opacity-0`} style={{ left: `${left}rem`, top: `${Math.round(Math.sqrt(625 - left ** 2))}rem` }}>
				<span className='size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2'>{[<StrokeStar1SVG key='1' />, <StrokeStar2SVG key='2' />, <StrokeStar3SVG key='3' />][randStarN]}</span>
				<span className={`${showStar && "top-7/20 left-3/4 duration-800"} size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2`}>{[<FilledStar1SVG key='1' />, <FilledStar2SVG key='2' />, <FilledStar3SVG key='3' />][randStarN]}</span>
			</div>
			<div className='duration-1000 transition-opacity size-15 absolute -translate-1/2 md:opacity-0' style={{ left: `calc(50% + ${mobileStarsLeft}rem)`, top: `${Math.sqrt(625 - mobileStarsLeft ** 2)}rem` }}>
				<span className='size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2'>
					<StrokeStar2SVG />
				</span>
				<span className={`${-10 < mobileStarsLeft && mobileStarsLeft < 20 && "top-7/20 left-3/4"} duration-800 size-7/5 absolute ease top-1/2 left-1/2 -translate-1/2`}>
					<FilledStar2SVG />
				</span>
			</div>
			<div className='absolute bottom-13.5 left-100 max-lg:left-14 text-sm max-w-1/3 space-y-2 max-md:max-w-full max-md:w-full max-md:bottom-10 max-md:text-center max-md:left-0'>
				<Copyright />
			</div>
		</div>
	)
}
