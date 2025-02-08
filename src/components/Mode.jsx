import { default as SunSVG } from "/src/assets/icons/sun.svg?react"
import { default as MoonSVG } from "/src/assets/icons/moon.svg?react"
import { useEffect, useState } from "react"

export default function Mode() {
	let [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"))

	useEffect(
		_ => {
			darkMode ^ document.documentElement.classList.contains("dark") && document.documentElement.classList.toggle("dark")
		},
		[darkMode]
	)
	return (
		<div className='mode box cursor-pointer rounded-full flex-center w-12 overflow-hidden' onClick={_ => setDarkMode(prev => !prev)}>
			<span className='duration-400'>{darkMode ? <MoonSVG /> : <SunSVG />}</span>
		</div>
	)
}
