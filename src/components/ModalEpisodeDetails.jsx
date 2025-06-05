import { image780 } from "../utils/constants"
import ReactMarkdown from "react-markdown"
import useModal from "../utils/useModal"

export default function ModalEpisodeDetails({ setShowModalEpisode, episodeData }) {
	useModal()
	return (
		<div onClick={_ => setShowModalEpisode(false)} className='fixed inset-0 size-full z-250 flex-center bg-[#000000B3]'>
			<div className='frost2 size-2/3 rounded-3xl relative p-4 overflow-hidden text-center ' onClick={e => e.stopPropagation()}>
				{episodeData.still_path && (
					<div className='absolute inset-0 w-full h-fit before:absolute before:h-dvh before:w-full before:bg-[#000000B3] before:z-40 before:inset-0 -z-10'>
						<img src={image780 + episodeData.still_path} className='episode-image size-full' />
					</div>
				)}
				<h1 className='text-5xl font-bold mt-10 mb-4 line-clamp-2 truncate whitespace-normal'>{episodeData.name}</h1>
				<span className='block text-3xl opacity-80 mb-5'>Episode {episodeData.episode_number}</span>
				<div className='truncate line-clamp-10 whitespace-normal text-lg px-4'>
					<ReactMarkdown>{episodeData.overview.replace(/<[^>]*>/g, "")}</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}
