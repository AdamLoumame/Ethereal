import { getById } from "@/services/api"
import { default as PlaySVG } from "@/assets/icons/filledplay.svg?react"
import { getAvrColor } from "@/utils/utils"
import useSWR from "swr"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getVideos } from "@/services/api"
import ModalVideo from "@/components/ModalVideo"

export default function HeroMovie({ id, picture, format, i }) {
	let { data } = useSWR(`data${id}`, _ => getById(id, format), { suspense: true })
	let { data: color } = useSWR(`color${id}`, _ => getAvrColor(picture), { suspense: true })
	let { data: trailer } = useSWR(`trailer${id}`, _ => getVideos(id, format), { suspense: true })
	trailer = trailer.filter(vid => vid.type === "Trailer")
	let [showVideo, setShowVideo] = useState(false)
	let [hideImage, setHideImage] = useState(false)
	let boxRef = useRef(null)

	useEffect(_ => {
		if (trailer?.length) {
			let waiting
			boxRef.current.addEventListener("mouseenter", _ => {
				waiting = setTimeout(() => {
					setShowVideo(true)
				}, 800)
			})
			boxRef.current.addEventListener("mouseout", _ => {
				setShowVideo(false)
				setHideImage(false)
				clearTimeout(waiting)
			})
		}
	}, [])
	let [showModalVideo, setShowModalVideo] = useState(false)

	return (
		<>
			<Link
				to={`/${format}/${id}`}
				ref={boxRef}
				className={`before:absolute before:inset-0 before:h-full before:w-full before:z-[11] before:bg-inherit before:opacity-20 relative rounded-3xl overflow-hidden duration-300 hover:scale-102  cursor-pointer ${color.isDark ? "text-textDark" : "text-textLight"}`}
				style={{ flexBasis: `${((i + 3) / 7) * 100}%`, backgroundColor: color.hex }}>
				<div className='absolute z-10 w-2/3 pl-6 py-4 h-full' style={{ background: `linear-gradient(to right, ${color.hex} 60%, transparent)` }}>
					<h2 className='text-3xl [word-spacing:0.1rem] absolute top-4 h-8/10 w-3/4'>{(data.tagline.length <= 50 && data.tagline.slice(0, -1)) || data.title || data.name}</h2>
				</div>
				{trailer[0] && (
					<div
						className='absolute left-6 bottom-4 flex items-center gap-3 text-sm cursor-pointer h-fit z-30'
						onClick={e => {
							e.preventDefault()
							setShowModalVideo(true)
						}}>
						<span className='bg-dark text-textDark size-8 flex-center rounded-full p-2'>
							<PlaySVG />
						</span>
						Play The Trailer
					</div>
				)}{" "}
				{showVideo && <iframe onLoad={e => setHideImage(true)} src={`https://www.youtube.com/embed/${trailer[0].key}?autoplay=1&loop=1&controls=0&playlist=${trailer[0].key}&mute=1`} allow='autoplay; encrypted-media' allowFullScreen className='absolute left-0 h-[300%] w-[120%] top-1/2 -translate-y-1/2' />}
				<img src={picture} className={`absolute ${i === 0 ? "h-full" : "h-[110%]"} ${hideImage && "opacity-0"} duration-500 top-0 right-0`} />
			</Link>
			{showModalVideo && <ModalVideo setShowVideo={setShowModalVideo} vidId={trailer[0].key} />}
		</>
	)
}
