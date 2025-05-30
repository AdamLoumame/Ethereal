import Logo from "@/components/Logo"
import SearchBar from "@/components/SearchBar"
import Menu from "@/components/Menu"
import Mode from "./Mode"
import { useRef, useState } from "react"
import useWindowClick from "../utils/useWindowClick"

export default function Head({ fullSearch, style = "", searchStyle = "", mode = false }) {
	let headRef = useRef(null)
	let [showNavigation, setShowNavigation] = useState(false)

	useWindowClick(e => !headRef.current?.contains(e.target) && setShowNavigation(false))

	return (
		<div ref={headRef} className={`flex sticky top-0 z-1000 items-center justify-between py-4 frost px-14 max-lg:px-8 border-b-1 ${style}`}>
			<div className='w-30 max-lg:w-25 max-sm:w-30'>
				<Logo />
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex gap-3 max-lg:gap-2 max-sm:hidden'>
					<Menu activeClass={"!border-inherit frost"} elClass={"hover:border-inherit border-1 flex items-center gap-2.5  max-lg:gap-1 text-lg rounded-3xl border-transparent py-2 px-4 duration-200"} iconClass='size-4' />
				</div>
				<SearchBar fullSearch={fullSearch} width={"w-70 max-lg:w-60 max-md:w-50"} style={searchStyle} />
				{mode && <Mode style='active max-sm:!hidden' />}
				<div className='size-10 group max-sm:block relative hidden cursor-pointer' onClick={_ => setShowNavigation(prev => !prev)}>
					<span className={`h-[1.5px] group-hover:top-1/4 w-full bg-textLight absolute top-1/3 dark:bg-textDark rounded-4xl origin-left duration-300 ${showNavigation && "rotate-45 !top-0 !w-13.5"}`} />
					<span className={`h-[1.5px] group-hover:bottom-1/4 w-full bg-textLight absolute bottom-1/3 dark:bg-textDark rounded-4xl origin-left duration-300 ${showNavigation && "-rotate-45 !bottom-0 !w-13.5"}`} />
				</div>
				<div className={`frost absolute overflow-y-clip max-sm:flex hidden opacity-0 top-[calc(100%_+_1px)] border-b-1 w-screen right-0 duration-300 h-0 ${showNavigation && "h-auto opacity-100"} flex p-8 flex-col gap-6`}>
					<Menu activeClass='before:top-[calc(100%_+_2px)] before:rounded-2xl before:absolute before:w-full before:left-0 before:h-[1.5px] dark:before:bg-textDark before:bg-textLight' elClass='flex w-fit relative items-center gap-4 text-3xl' iconClass='size-6' />
				</div>
			</div>
		</div>
	)
}
