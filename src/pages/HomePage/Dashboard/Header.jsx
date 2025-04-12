import Mode from "@/components/Mode"
import HeaderBar from "./HeaderBar"

export default function Header() {
	return (
		<div className='flex justify-end p-4 pb-0'>
			<HeaderBar />
			<Mode />
		</div>
	)
}
