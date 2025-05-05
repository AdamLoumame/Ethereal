import { useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useNavigation } from "react-router-dom"

NProgress.configure({ showSpinner: false, minimum: 0.6 })
export default function useLoader() {
	let nav = useNavigation()
	useEffect(
		_ => {
			if (nav.state === "loading") {
				NProgress.start()
			} else if (nav.state === "idle") {
				NProgress.done()
			}
		},
		[nav]
	)
	return "dfsdf"
}
