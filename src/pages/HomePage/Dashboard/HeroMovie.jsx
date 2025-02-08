import { getAvrColor } from "/src/utils/utils"
import { default as PlaySVG } from "/src/assets/icons/play.svg?react"
import { getById } from "/src/services/api.js"
import useSWR from 'swr';

export default function HeroMovie({ id, picture, basis, format }) {
	console.log(id,format)
	let { data } = useSWR(["data", id], _ => getById(id, format), { suspense: true })
	let { data: color } = useSWR(["data", picture], _ => getAvrColor(picture), { suspense: true })

	return (
		<div className='relative flex rounded-3xl overflow-hidden' style={{ flexBasis: basis }}>
			<div className={`flex flex-col justify-end absolute z-10 w-[45%] pl-6 py-4 h-full ${color.isDark ? "text-textDark" : "text-textLight"}`} style={{ backgroundColor: color.hex, boxShadow: `10px 0px 58px 55px ${color.hex}` }}>
				<h2 className='text-3xl [word-spacing:0.1rem] absolute top-4 h-8/10 w-5/4'>{(data.tagline.length <= 50 && data.tagline.slice(0, -1)) || data.title || data.name}</h2>
				<div className='flex items-center gap-3 text-sm cursor-pointer h-fit'>
					<span className='bg-dark text-textDark size-8 flex-center rounded-full p-2'>
						<PlaySVG />
					</span>
					Play The Trailer
				</div>
			</div>
			<img src={picture} className='absolute h-full right-0' />
		</div>
	)
}
