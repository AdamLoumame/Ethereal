import { useEffect, useRef, useState } from "react"

export default function SliderProvider({ id, deps, render }) {
	let slider = useRef(null)
	let [showLeft, setShowLeft] = useState(false)
	let [showRight, setShowRight] = useState(false)

	let scroll = (d, s = 1) => {
		console.log("here")
		let scrollD = s * slider.current.clientWidth - 100
		slider.current.scrollBy({
			left: d === "r" ? scrollD : -scrollD,
			behavior: "smooth"
		})
	}

	useEffect(
		_ => {
			slider.current.scrollTo({ left: 0 })
			setShowRight(slider.current?.scrollLeft + slider.current?.clientWidth < slider.current?.scrollWidth)
		},
		[id, deps]
	)

	useEffect(_ => {
		slider.current.addEventListener("scroll", _ => {
			let { scrollLeft, clientWidth, scrollWidth } = slider.current
			setShowRight(scrollLeft + clientWidth < scrollWidth)

			setShowLeft(scrollLeft > 10)
		})
	}, [])

	return render({ slider, showRight, showLeft, scroll })
}
