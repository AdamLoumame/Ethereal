import { useEffect, useRef, useState } from "react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"
import { default as FilledStar2SVG } from "@/assets/icons/filledstar2.svg?react"
import { default as StrokeStar2SVG } from "@/assets/icons/strokestar2.svg?react"
import { useSearchParams } from "react-router-dom"
import { capitalize, toggleParam } from "../utils/utils"
import useWindowClick from "../utils/useWindowClick"

export default function FilterOption({ option, filters, fallback = "" }) {
	let [hovered, setHovered] = useState(false)
	let [searchParams, setSearchParams] = useSearchParams()
	let buttonRef = useRef()

	useWindowClick(e => !buttonRef.current?.contains(e.target) && setHovered(false))

	return (
		<div className='relative' ref={buttonRef}>
			<div className='button rounded-3xl active items-center text-xl flex cursor-pointer duration-300 px-3 py-2' onClick={_ => setHovered(prev => !prev)}>
				{capitalize(option)}
				<div className='size-8 ml-2 relative'>
					<span className={`absolute duration-200 top-0 right-0 ${hovered && "!-top-2 !-right-2"}`}>
						<FilledStar2SVG />
					</span>
					<span className='absolute'>
						<StrokeStar2SVG />
					</span>
				</div>
			</div>
			<div className={`absolute left-0 top-15/10 p-5 pointer-events-none rounded-3xl min-w-40 border-1 frost flex flex-wrap items-start justify-start gap-y-6 gap-x-8 opacity-0 duration-100 ${hovered && "opacity-100 !pointer-events-auto"}`} style={{ width: `${(filters?.length || 8) * 2}rem` }}>
				{filters?.map(filter => (
					<span key={filter.id} onClick={_ => toggleParam(filter.id, searchParams, setSearchParams)} className='text-xl relative cursor-pointer flex items-center gap-1 whitespace-nowrap'>
						{String(filter.id) === searchParams.get(option) && (
							<span className='size-6 min-w-6 min-h-6'>
								<FilledStar3SVG />
							</span>
						)}
						{filter.name}
					</span>
				))}
				{!filters && <span className='italic'>{fallback}</span>}
			</div>
		</div>
	)
}
