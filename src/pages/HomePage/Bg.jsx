import { useEffect, useRef } from "react"
import { gsap } from "gsap/gsap-core"
import { CSSPlugin } from "gsap/CSSPlugin"
import gradients from "/src/assets/genresGradients"

gsap.registerPlugin(CSSPlugin)

console.log(gradients)

export default function Bg() {
	const boxRef = useRef(null)

	useEffect(() => {
		let g2 = gradients.comedy

		const animation = gsap.to(boxRef.current, { ease: "none", duration: 2, background: g2, repeat: 0 })

		return () => animation.kill()
	}, [])

	return (
		<div className='noise size-full absolute top-0 left-0'>
			<div className='bg size-full' ref={boxRef} />
		</div>
	)
}
