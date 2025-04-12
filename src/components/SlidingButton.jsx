import { default as ArrowSVG } from "@/assets/icons/arrow.svg?react"

export default function SlidingButton({ type, scroll }) {
	return (
		<div onClick={scroll} className={`absolute ${type === "r" ? "right-0" : "left-0"} slider-button cursor-pointer top-0 h-full w-16 z-10 `}>
			<span className={`${type === "r" ? "rotate-90" : "-rotate-90"} slider-button-icon absolute top-1/3 shadow-lg left-1/2 -translate-x-1/2 block p-1.5 size-8 rounded-full opacity-0 duration-200 scale-0 box`}>
				<ArrowSVG />
			</span>
		</div>
	)
}
