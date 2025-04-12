import { default as DefaultImageSVG } from "@/assets/icons/defaultimage.svg?react"

export default function LazyImage({
	src,
	alt,
	styles = "",
	loadOp = _ => "",
	FallBack = _ => (
		<span className='absolute top-1/2 left-1/2 -translate-1/2 h-1/5'>
			<DefaultImageSVG />
		</span>
	)
}) {
	return (
		<div className={`${styles} bg-[#00000080] group hover:rounded-none duration-300 relative rounded-3xl overflow-hidden z-10 flex-center text-light`}>
			{src.includes("null") || src.includes("undefined") ? (
				<FallBack />
			) : (
				<img
					key={src}
					loading='lazy'
					src={src}
					alt={alt}
					className='absolute opacity-0 top-0 left-0 size-full duration-300 ease-in-out group-hover:scale-105'
					onLoad={e => {
						e.target.classList.add("lazy-img-loaded")
						loadOp()
					}}
				/>
			)}
		</div>
	)
}
