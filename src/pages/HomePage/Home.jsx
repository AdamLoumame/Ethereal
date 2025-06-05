import Footer from "../../components/Footer"
import Head from "../../components/Head"
import Dashboard from "./Dashboard/Dashboard"
import Header from "./Dashboard/Header"
import SideBar from "./SideBar/SideBar"

export default function Home() {
	return (
		<div className='noise h-screen max-lg:h-auto flex max-lg:block max-lg:space-y-2'>
			<SideBar />
			<Head fullSearch style="max-lg:flex hidden" searchStyle='border-1 frost border-inherit' mode />
			<Dashboard />
			<Footer />
		</div>
	)
}
