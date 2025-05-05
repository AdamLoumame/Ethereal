import { useState } from "react"
import { Link } from "react-router-dom"
import { default as ArrowSVG } from "@/assets/icons/arrow.svg?react"
import { eliminateDuplicates } from "../../utils/utils"

export default function Filmography({ title, credit }) {
	let [show, setShow] = useState(title === "Actor")
	credit = eliminateDuplicates(credit, "id")

	return (
		<div className='mt-3 frost2 rounded-3xl p-4'>
			<div className='flex justify-between items-center px-2 cursor-pointer' onClick={_ => setShow(prev => !prev)}>
				<h2 className='text-xl'>{title}</h2>
				<span className='flex gap-2 items-center text-lg'>
					{show ? "Hide" : "Show"}
					<div className={`${!show && "rotate-x-180"} size-4 duration-300`}>
						<ArrowSVG />
					</div>
				</span>
			</div>
			<div className={`flex flex-col gap-2 max-h-0 overflow-hidden duration-300 ${show && "mt-4"}`} style={{ maxHeight: show && `${credit.length * 2}rem`, transitionProperty: show && "max-height" }}>
				{credit.map(c => (
					<span key={c.media_type + c.id}>
						<span className='inline-block opacity-60 w-20 text-center'>{c.release_date?.slice(0, 4) || "-"}</span>
						<Link to={`/${c.media_type}/${c.id}`}>
							<span className='inline-flex font-medium relative overflow-hidden hover:before:duration-300 before:absolute before:bottom-0 before:h-[.5px] before:w-full hover:before:translate-x-full before:-translate-x-full before:bg-light before:ease'>{c.title || c.name}</span>
							{(c.character || c.job) && <span className='opacity-60'> · as {c.character || c.job}</span>}
						</Link>
					</span>
				))}
			</div>
		</div>
	)
}
