import { default as SunSVG } from "@/assets/icons/sun.svg?react"
import { default as MoonSVG } from "@/assets/icons/moon.svg?react"
import useMode from "../utils/useMode"

export default function Mode({ style = "" }) {
	let [isDark, setIsDark] = useMode()

	return (
		<div onClick={_ => setIsDark(prev => !prev)} className={`mode ${style} button rounded-full flex-center size-12 cursor-pointer overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-full p-3`}>
			{isDark ? <MoonSVG /> : <SunSVG />}
		</div>
	)
}
