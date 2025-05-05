import Logo from "@/components/Logo"
import SearchBar from "@/components/SearchBar"
import Menu from "@/components/Menu"
import Mode from "./Mode"

export default function Head({ fullSearch, style, mode = false }) {
	return (
		<div className='flex sticky top-0 z-100 items-center justify-between py-4 frost px-14 border-b-1'>
			<div className='w-30'>
				<Logo />
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex gap-3'>
					<Menu activeClass={"!border-inherit frost"} elClass={"hover:border-inherit border-1 flex items-center gap-2.5 text-lg rounded-3xl border-transparent py-2 px-4 duration-200"} iconClass='size-4' />
				</div>
				<SearchBar fullSearch={fullSearch} width={"w-70"} style={style} />
				{mode && <Mode style='active' />}
			</div>
		</div>
	)
}
