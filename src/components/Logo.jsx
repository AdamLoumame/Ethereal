import { default as LogoSVG } from "@/assets/icons/logo.svg?react"
import { Link } from "react-router-dom"

export default function Logo() {
	return (
		<Link to='/' className='flex-center'>
			<LogoSVG />
		</Link>
	)
}
