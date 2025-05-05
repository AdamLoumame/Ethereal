import { useEffect, useRef } from "react"
import { gsap } from "gsap/gsap-core"
import { CSSPlugin } from "gsap/CSSPlugin"

gsap.registerPlugin(CSSPlugin)

export default function Bg({ colors = ["#0D0D0D", "#1A1A1A", "#333333", "#4D4D4D"] }) {
	const boxRef = useRef(null)

	useEffect(() => {
		let g2 = `radial-gradient(circle farthest-side at top left, ${colors[0]}, transparent 70%),
            radial-gradient(circle farthest-side at top right, ${colors[1] || "#1A1A1A"}, transparent 70%),
            radial-gradient(circle farthest-side at bottom right, ${colors[2] || "#333333"}, transparent 70%),
            radial-gradient(circle farthest-side at bottom left, ${colors[3] || "#4D4D4D"}, transparent 70%)`

			const animation = gsap.to(boxRef.current, { ease: "power2.inOut", duration: 1, background: g2, repeat: 0 })

		return () => animation.kill()
	}, [colors])

	return <div className='bg-blend-multiply noise fixed top-0 left-0 size-full -z-10' ref={boxRef} />
}
