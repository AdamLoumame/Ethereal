import Dashboard from "./Dashboard/Dashboard"
import SideBar from "./SideBar/SideBar"
import { useEffect } from "react"

export default function Home() {
	return (
		<div className='noise h-screen flex'>
			<SideBar />
			<Dashboard />
		</div>
	)
}
