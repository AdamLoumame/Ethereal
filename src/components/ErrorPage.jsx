import { default as EllipseSVG } from "@/assets/icons/ellipse.svg?react"
import { default as StrokeStar3SVG } from "@/assets/icons/strokestar3.svg?react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import { useEffect, useState } from "react"
import useMode from "../utils/useMode"

export default function ErrorPage() {
	let [starHovered, setStarHovered] = useState(false)

	useEffect(
		_ => {
			console.log(starHovered)
			if (setStarHovered) {
				let timer = setTimeout(_ => setStarHovered(false), 400)
				return _ => clearTimeout(timer)
			}
		},
		[starHovered]
	)
	let [_, setIsDark] = useMode()
	return (
		<div className='h-dvh flex-center noise gap-10 overflow-hidden relative error-page'>
			<div className='absolute top-1/2 -right-2 rotate-45 h-full origin-top w-[2px] bg-textLight dark:bg-textDark' /> <div className='absolute bottom-1/2 -left-2 rotate-45 h-full origin-bottom w-[2px] bg-textLight dark:bg-textDark' />
			<div className='absolute w-50 bottom-5 right-5 max-lg:w-30'>
				<Logo />
			</div>
			<div className={`flex ${starHovered && "group"} leading-50 z-400 font-semibold text-13xl select-none`} onMouseEnter={_ => setStarHovered(true)}>
				<div className='text-stroke'>4</div>
				<div className='size-40 my-auto relative'>
					{[...Array(5)].map((_, i) => (
						<div key={i} className='absolute inset-1/2 -translate-1/2 opacity-0 group-hover:opacity-30 duration-300 pointer-events-none' style={{ transitionDelay: `${i * 0.07}s`, width: `calc(100% + ${2 * (i + 2) ** 3}rem)`, height: `calc(100% + ${2 * (i + 2) ** 3}rem)` }}>
							<StrokeStar3SVG />
						</div>
					))}
					<div
						className='absolute size-full cursor-pointer'
						onClick={_ => {
							setStarHovered(true)
							setIsDark(prev => !prev)
						}}>
						<StrokeStar3SVG />
					</div>
				</div>
				<div className='text-stroke'>4</div>
			</div>
			<div className='h-full max-w-100 flex flex-col gap-4 justify-center'>
				<h1 className='text-xl font-medium'>Well, this is an unexpected plot hole! Looks like the page you're looking for isn't in this cut. Let's get you back to the main storyline.</h1>
				<h1 className='text-lg max-w-80 flex items-center'>
					Roll back to the Beginning
					<Link to={"/"} className='group !inline-flex flex-center gap-1 ml-2 font-semibold text-xl cursor-pointer text-inherit relative w-fit'>
						<span className='block size-6'>
							<FilledStar3SVG />
						</span>
						Home
						<div className='absolute overflow-hidden w-full h-[.5px] top-full left-0'>
							<div className='absolute h-full w-full group-hover:translate-x-full -translate-x-full group-hover:duration-300 in-[.no-mode]:bg-textDark dark:bg-textDark bg-textLight ease' />
						</div>
					</Link>
				</h1>
			</div>
		</div>
	)
}
