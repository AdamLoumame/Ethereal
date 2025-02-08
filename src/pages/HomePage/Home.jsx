import { createContext, useState } from "react"
import Dashboard from "./Dashboard/Dashboard"
import SideBar from "./SideBar/SideBar"

export default function Home() {
	return (
		<div className='h-screen flex p-4 gap-4'>
			<SideBar />
			<Dashboard />
			<div className='noise' />
		</div>
	)
}
