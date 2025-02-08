import { NavLink } from "react-router-dom"
import { default as HomeSVG } from "/src/assets/icons/home.svg?react"
import { default as FavSVG } from "/src/assets/icons/favorite.svg?react"

export default function NavBar() {
	return (
		<>
			<div className='logo flex items-center gap-2 mb-5'>
				<img src='/src/assets/ghost.png' className='size-14' />
				<div className='cursor-pointer'>
					<span className='text-6xl tracking-tight'>E</span>
					<span className='text-3xl'>thereal</span>
				</div>
			</div>
			<div className='list-none flex flex-col gap-2'>
				<NavLink to='/' className={({ isActive }) => `${isActive && "active-nav-el"} nav-el ml-5`}>
					<HomeSVG />
					Home
				</NavLink>
				<NavLink to='/favorite' className={({ isActive }) => `${isActive && "active-nav-el"} nav-el ml-5`}>
					<FavSVG />
					Favorite
				</NavLink>
				<NavLink to='/explore' className='nav-el explore relative mt-5'>
					<span className='box rounded-full py-2 flex-center z-10 w-full duration-250'>Explore</span>
				</NavLink>
			</div>
		</>
	)
}
