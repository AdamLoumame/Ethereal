import Mode from "../../../components/Mode"
import TopBar from "./TopBar"

export default function Header() {
	return (
		<div className='flex justify-end'>
			<TopBar />
			<Mode />
		</div>
	)
}
