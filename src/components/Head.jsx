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

	let [focusedSearchBar, setfocusedSearchBar] = useState(false)
	return (
		<div ref={headRef} className={`flex sticky top-0 z-1000 items-center justify-between py-4 frost px-14 max-lg:px-8 border-b-1 ${style} ${focusedSearchBar && "max-sm:justify-center"} max-sm:h-35`}>
			<div className={`w-30 max-lg:w-25 max-sm:w-35 max-2xs:w-30 ${focusedSearchBar && "max-sm:hidden"}`}>
				<Logo />
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex gap-3 max-lg:gap-2 max-sm:hidden'>
					<Menu activeClass={"!border-inherit frost"} elClass={"hover:border-inherit border-1 flex items-center gap-2.5  max-lg:gap-1 text-lg rounded-3xl border-transparent py-2 px-4 duration-200"} iconClass='size-4' />
				</div>
				<SearchBar fullSearch={fullSearch} width={"w-70 max-lg:w-60 max-md:w-50 max-sm:w-65 max-2xs:w-55"} style={searchStyle} focused={focusedSearchBar} setFocused={setfocusedSearchBar} />
				{mode && <Mode style='active max-sm:!hidden' />}
				<div className={`size-10 max-xs:size-12 group max-sm:block relative hidden cursor-pointer ${focusedSearchBar && "max-sm:hidden"}`} onClick={_ => setShowNavigation(prev => !prev)}>
					<span className={`h-[1.5px] group-hover:top-1/4 w-full bg-textLight dark:bg-textDark absolute top-1/3 rounded-4xl origin-left duration-300 ${showNavigation && "rotate-45 !top-0 !w-13.5 max-xs:!w-16"}`} />
					<span className={`h-[1.5px] group-hover:bottom-1/4 w-full bg-textLight absolute bottom-1/3 dark:bg-textDark rounded-4xl origin-left duration-300 ${showNavigation && "-rotate-45 !bottom-0 !w-13.5 max-xs:!w-16"}`} />
				</div>
				<div className={`frost absolute overflow-y-clip max-sm:flex opacity-0 hidden top-[calc(100%_+_1px)] border-b-1 w-screen right-0 duration-300 h-0 ${showNavigation && "h-auto opacity-100 p-8 flex"} flex-col gap-10`}>
					<Menu activeClass='before:top-[calc(100%_+_2px)] before:rounded-2xl before:absolute before:w-full before:left-0 before:h-[1.5px] dark:before:bg-textDark before:bg-textLight' elClass='flex w-fit relative items-center gap-4 text-4xl' iconClass='size-8' />
				</div>
			</div>
		</div>
	)
}
