import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import { default as PlaySVG } from "@/assets/icons/play.svg?react"
import { default as PauseSVG } from "@/assets/icons/pause.svg?react"
import { default as VolumeSVG } from "@/assets/icons/volume.svg?react"
import { default as ShrinkSVG } from "@/assets/icons/shrink.svg?react"
import { default as ExpandSVG } from "@/assets/icons/expand.svg?react"
import ProgressBar from "./ProgressBar"
import { formatTime } from "@/utils/utils"
import useModal from "../utils/useModal"

export default function ModalVideo({ setShowVideo, vidId }) {
	let playerRef = useRef(null)
	let videoRef = useRef(null)

	let [duration, setDuration] = useState(0)
	let [progress, setProgress] = useState(0)
	let [volume, setVolume] = useState(0.5)
	let [playing, setPlaying] = useState(true)
	let [mute, setMute] = useState(true)

	let [fullScreen, setFullScreen] = useState(false)
	useEffect(
		_ => {
			fullScreen ? videoRef.current.requestFullscreen() : document.exitFullscreen()
		},
		[fullScreen]
	)
	useModal()

	useEffect(_ => {
		document.addEventListener("keydown", e => e.code === "Space" && setPlaying(prev => !prev))
		return _ => document.removeEventListener("keydown", _ => e.code === "Space" && setPlaying(prev => !prev))
	}, [])

	return (
		<div className='fixed left-0 top-0 size-full z-250 flex-center cursor-default text-light bg-[#000000B3]' onClick={_ => setShowVideo(false)}>
			<div className='relative h-160 w-285 overflow-hidden bg-black' ref={videoRef} onClick={e => e.stopPropagation()}>
				<div className='absolute w-full h-2/1 inset-1/2 -translate-1/2 before:size-full before:absolute before:inset-0' onClick={_ => setPlaying(prev => !prev)}>
					<ReactPlayer
						ref={playerRef}
						url={`https://www.youtube.com/watch?v=${vidId}`}
						playing={playing}
						onPlay={_ => setPlaying(true)}
						onPause={_ => setPlaying(false)}
						loop={true}
						controls={false}
						muted={mute}
						volume={volume}
						width='100%'
						height='100%'
						onDuration={duration => setDuration(duration)}
						onProgress={progress => setProgress(progress.playedSeconds)}
						config={{ youtube: { playerVars: { cc_load_policy: 0 } } }}
						progressInterval={1}
					/>
				</div>
				<div className='absolute w-full bottom-0 left-0 px-6 pb-6 flex flex-col'>
					<ProgressBar name='sound-progress' changingDep={duration} progress={progress} setProgress={setProgress} goToProgress={time => playerRef.current.seekTo(time, "seconds")} smooth downOperation={_ => setPlaying(false)} upOperation={_ => setPlaying(true)} />
					<div className='flex justify-between text-sm mt-4'>
						<span>{formatTime(progress)}</span>
						<span>{formatTime(duration)}</span>
					</div>
					<div className='flex items-center mt-5'>
						<div className='basis-1/3 pl-1'>
							<div className='w-1/3 flex items-center gap-2'>
								<span className={`w-10 h-fit cursor-pointer relative before:duration-300 before:inset-0 before:origin-top before:-rotate-45 before:w-1 before:border-light mute-button before:border-l-2 before:absolute before:h-0 ${mute && "before:h-[130%]"}`} onClick={_ => setMute(prev => !prev)}>
									<VolumeSVG />
								</span>
								<ProgressBar name='video-progress' progress={mute ? 0 : volume} setProgress={setVolume} goToProgress={_ => setMute(false)} />
							</div>
						</div>
						<div className='flex justify-center basis-1/3'>
							<div className='cursor-pointer size-9' onClick={_ => setPlaying(prev => !prev)}>
								{playing ? <PauseSVG /> : <PlaySVG />}
							</div>
						</div>
						<div className='flex justify-end basis-1/3 pr-1'>
							<div className='size-8 cursor-pointer' onClick={_ => setFullScreen(prev => !prev)}>
								{fullScreen ? <ShrinkSVG /> : <ExpandSVG />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
