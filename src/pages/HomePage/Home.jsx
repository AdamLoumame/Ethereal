import Dashboard from "./Dashboard/Dashboard"
import SideBar from "./SideBar/SideBar"

export default function Home() {
	return (
		<div className='noise h-screen flex'>
			<SideBar />
			<Dashboard />
		</div>
	)
}
