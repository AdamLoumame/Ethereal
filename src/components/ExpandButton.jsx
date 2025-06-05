import { default as ArrowSVG } from "@/assets/icons/arrow.svg?react"

export default function ExpandButton({ setShowFullText, textRef, more = false }) {
	return (
		<>
			{more && <span>...</span>}
			<div
				onClick={e => {
					setShowFullText(more)
					textRef.current.toggleLines(e)
				}}
				className='font-extrabold  flex mt-1 items-center gap-1 cursor-pointer'>
				{more ? "More" : "Less"}
				<div className={`${more && "rotate-x-180"} size-4 duration-200`}>
					<ArrowSVG />
				</div>
			</div>
		</>
	)
}
