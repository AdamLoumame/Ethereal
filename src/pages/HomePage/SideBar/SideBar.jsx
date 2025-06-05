import Logo from "@/components/Logo.jsx"
import Menu from "@/components/Menu.jsx"
import useLocalStorage from "../../../utils/useLocalStorage"
import SideBarLastBrowsed from "./SideBarLastBrowsed"
import Copyright from "../../../components/Copyright"
import { Suspense } from "react"

export default function SideBar() {
	let [lastBrowsed] = useLocalStorage("lastbrowsed", [])

	return (
		<div className='h-full border-r-1 flex flex-col dark:border-textDark gap-8 border-textLight basis-1/5 min-w-1/5 py-4 z-10 overflow-hidden justify-between max-lg:hidden'>
			<div className='space-y-8'>
				<div className='w-45 mx-auto duration-300 basis-1/8 max-xl:w-40'>
					<Logo />
				</div>
				<div className='list-none flex flex-col gap-2 basis-2/8'>
					<Menu activeClass={"active-nav-el"} elClass={"h-12 duration-300 relative font-bold text-3xl max-xl:text-2xl flex items-center gap-6 px-8 dark:border-textDark border-textLight"} iconClass='w-6' />
				</div>
				{lastBrowsed[0] && (
					<div className='px-5 basis-3/8'>
						<h1 className='text-2xl mb-5 max-xl:text-xl'>Continue Browsing</h1>
						<div className='flex flex-col-reverse gap-3'>
							{lastBrowsed.slice(0, 3).map(listed => (
								<Suspense
									key={String(listed.id) + listed.fomat}
									fallback={
										<div className='flex gap-3 animate-pulse'>
											<div className='h-18 w-12 bg-textLight opacity-50 rounded-2xl dark:bg-textDark' />
											<div className='flex w-3/5 flex-col gap-4 flex-center'>
												<span className='block w-full h-3 rounded-3xl bg-textLight dark:bg-textDark opacity-50' />
												<span className='block w-full h-3 rounded-3xl bg-textLight dark:bg-textDark opacity-50' />
											</div>
										</div>
									}>
									<SideBarLastBrowsed id={listed.id} format={listed.format} />
								</Suspense>
							))}
						</div>
					</div>
				)}
			</div>
			<div className='relative px-5 bottom-0 text-sm max-xl:text-xs'>
				<Copyright />
			</div>
		</div>
	)
}
