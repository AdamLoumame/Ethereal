import { useEffect } from "react"

export default function useModal() {
	useEffect(_ => {
		document.addEventListener("keydown", e => e.code === "Space" || (e.code === "Tab" && e.preventDefault()))
		document.body.classList.add("modal-on")

		return _ => {
			document.removeEventListener("keydown", e => e.code === "Space" || (e.code === "Tab" && e.preventDefault()))
			document.body.classList.remove("modal-on")
		}
	}, [])
}
