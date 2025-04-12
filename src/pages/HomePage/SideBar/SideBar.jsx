import Logo from "@/components/Logo.jsx"
import Menu from "@/components/Menu.jsx"

export default function SideBar() {
	return (
		<div className='h-full border-r-1 dark:border-textDark border-textLight basis-1/5 min-w-1/5 py-4 z-10'>
			<div className='w-45 mx-auto duration-300'>
				<Logo />
			</div>
			<div className='list-none flex flex-col gap-2 mt-5'>
				<Menu activeClass={"active-nav-el"} elClass={" h-12 duration-300 relative font-bold text-3xl flex items-center gap-6 px-8 dark:border-textDark border-textLight"} iconClass='w-6' />
			</div>
		</div>
	)
}
