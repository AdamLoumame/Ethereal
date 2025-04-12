import { useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

export default function useLoader(done) {
	useEffect(() => {
		console.log(done)
		if (done) {
			NProgress.done()
		} else {
			NProgress.start()
		}
	}, [done])
}
