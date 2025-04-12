import { useEffect } from "react"

export default function useModal() {
	useEffect(_ => {
		let handleSpacePausing = e => {
			if (e.code === "Space" || e.code === "Tab") {
				e.preventDefault()
				setPlaying(prev => !prev)
			}
		}
		document.addEventListener("keydown", handleSpacePausing)
		document.body.classList.add("modal-on")

		return _ => {
			document.removeEventListener("keydown", handleSpacePausing)
			document.body.classList.remove("modal-on")
		}
	}, [])
}
