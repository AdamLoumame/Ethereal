import { useEffect, useState } from "react"

export default function ProgressBar({ name = "", changingDep = 1, progress, setProgress, goToProgress = () => "", smooth = false, downOperation = () => "", upOperation = () => "" }) {
	let [hoverProgression, setHoverProgression] = useState(null)

	useEffect(
		_ => {
			let progressEL = document.querySelector(`.${name}`)
			let mouseDown = false
			let mouseProgress = e => Math.min(changingDep, Math.max(0, ((e.clientX - progressEL.getBoundingClientRect().left) * changingDep) / progressEL.getBoundingClientRect().width))
			let handleProgressing = e => {
				if (mouseDown) {
					goToProgress(mouseProgress(e))
					setProgress(mouseProgress(e))
				}
			}
			let handleMouseDown = e => {
				if (e.target.closest(`.${name}`) === progressEL) {
					mouseDown = true
					downOperation()
				}
			}
			let handleMouseUp = e => {
				if (e.target.closest(`.${name}`) === progressEL) {
					mouseDown = false
					upOperation()
				}
			}
			window.addEventListener("mousedown", handleMouseDown)
			window.addEventListener("mouseup", handleMouseUp)
			window.addEventListener("mousemove", handleProgressing)

			return _ => {
				window.removeEventListener("mousedown", handleMouseDown)
				window.removeEventListener("mouseup", handleMouseUp)
				window.removeEventListener("mousemove", handleProgressing)
			}
		},
		[changingDep]
	)

	return (
		<div
			className={`${name} group cursor-pointer relative w-full h-1 hover:h-2 duration-200 bg-[#ffffff33] rounded-full overflow-hidden`}
			onMouseMove={e => setHoverProgression(((e.clientX - e.currentTarget.getBoundingClientRect().left) * 100) / e.currentTarget.getBoundingClientRect().width)}
			onMouseLeave={_ => setHoverProgression(0)}
			onClick={e => {
				let desiredProgress = Math.min(changingDep, Math.max(0, ((e.clientX - e.currentTarget.getBoundingClientRect().left) * changingDep) / e.currentTarget.getBoundingClientRect().width))
				setProgress(desiredProgress)
				goToProgress(desiredProgress)
			}}>
			<span className='group-hover:opacity-100 opacity-0 absolute left-0 h-full bg-[#FFFFFF4D]' style={{ width: `${hoverProgression}%` }} />
			<span className={`absolute left-0 h-full bg-white ${smooth && "duration-50"}`} style={{ width: `${(progress * 100) / changingDep}%` }} />
		</div>
	)
}
