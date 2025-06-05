import { useLayoutEffect } from "react"

export default function useWindowClick(hideSearch) {
	useLayoutEffect(_ => {
		window.addEventListener("click", hideSearch)
		return _ => window.removeEventListener("click", hideSearch)
	}, [])
}
