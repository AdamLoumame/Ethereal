import SliderProvider from "./SliderProvider"
import SlidingButton from "./SlidingButton"

export default function Slider({ children, id, addP = false }) {
	return (
		<SliderProvider
			id={id}
			render={({ slider, showRight, showLeft, scroll }) => (
				<div className='slider-parent relative h-full'>
					{showLeft && <SlidingButton type='l' scroll={_ => scroll("l")} />}
					<div ref={slider} className={`slider scrollx flex gap-4 h-full ${addP ? "px-14 scroll-px-14" : "px-8 scroll-px-8"}`}>
						{children}
					</div>
					{showRight && <SlidingButton type='r' scroll={_ => scroll("r")} />}
				</div>
			)}
		/>
	)
}
