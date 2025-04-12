import React, { useEffect, useState } from "react"
import { default as SunSVG } from "@/assets/icons/sun.svg?react"
import { default as MoonSVG } from "@/assets/icons/moon.svg?react"

export default function Mode() {
	let [isDark, setIsDark] = useState(false)
	useEffect(
		_ => {
			isDark ^ document.documentElement.classList.contains("dark") && document.documentElement.classList.toggle("dark")
		},
		[isDark]
	)

	return (
		<div onClick={_ => setIsDark(prev => !prev)} className='mode button rounded-full flex-center size-12 p-2.5 cursor-pointer overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-full'>
			{isDark ? <MoonSVG /> : <SunSVG />}
		</div>
	)
}
