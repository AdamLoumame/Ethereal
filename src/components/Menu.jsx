import { NavLink } from "react-router-dom"
import { default as HomeSVG } from "@/assets/icons/home.svg?react"
import { default as FavSVG } from "@/assets/icons/watchlist.svg?react"
import { default as ExploreSVG } from "@/assets/icons/explore.svg?react"

export default function Menu({ activeClass, elClass, iconClass }) {
	let style = ({ isActive }) => `${isActive && activeClass} ${elClass}`

	return (
		<>
			<NavLink to='/' className={style}>
				<span className={iconClass}>
					<HomeSVG />
				</span>
				Home
			</NavLink>
			<NavLink to='/watchlist' className={style}>
				<span className={iconClass}>
					<FavSVG />
				</span>
				Watchlist
			</NavLink>
			<NavLink to='/explore' className={style}>
				<span className={iconClass}>
					<ExploreSVG />
				</span>
				Explore
			</NavLink>
		</>
	)
}
