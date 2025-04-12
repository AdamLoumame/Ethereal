export default function Tooltip({ tip }) {
	return <div className='tooltip pointer-events-none whitespace-nowrap opacity-0 scale-75 duration-100 absolute top-[120%] left-1/2 -translate-x-1/2 rounded-2xl frost p-3'>{tip}</div>
}
