import { default as StrokeStar3SVG } from "@/assets/icons/strokestar3.svg?react"
import { default as FilledStar3SVG } from "@/assets/icons/filledstar3.svg?react"

export default function Loader() {
	return (
		<div className='h-8 w-full relative flex justify-center gap-4.5'>
			{[...Array(3)].map((_, i) => (
				<div key={i} className='relative h-full'>
					<span className='animate-scale absolute inset-0' style={{ animationDelay: `.${i}s` }}>
						<FilledStar3SVG />
					</span>
					<span>
						<StrokeStar3SVG />
					</span>
				</div>
			))}
		</div>
	)
}
