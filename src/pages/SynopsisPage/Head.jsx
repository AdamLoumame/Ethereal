import Logo from "@/components/Logo"
import SearchBar from "@/components/SearchBar"
import Menu from "@/components/Menu"

export default function Head() {
	return (
		<div className='flex sticky top-0 z-100 items-center justify-between py-4 frost px-14 mb-14 border-b-1'>
			<div className='w-30'>
				<Logo />
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex gap-2 '>
					<Menu activeClass={"text-textDark border-textDark"} elClass={"header-el flex items-center gap-2.5 text-lg rounded-3xl border-1 border-transparent py-2 px-4 duration-200"} iconClass='size-4' />
				</div>
				<SearchBar width={"w-70"} style='frost2' />
			</div>
		</div>
	)
}
