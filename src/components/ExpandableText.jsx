import ExpandButton from "./ExpandButton"
import Markdown from "react-markdown"
import { ShowMore } from "@re-dev/react-truncate"
import { useEffect, useRef, useState } from "react"

export default function ExpandableText({ text }) {
	let textRef = useRef(null)

	let [showFullText, setShowFullText] = useState(false)
	useEffect(_ => setShowFullText(false), [text])
	if (text) {
		return (
			<div className='w-3/4 whitespace-normal tracking-wide text-md'>
				<ShowMore ref={textRef} className='expandable-text' expanded={showFullText} lines={5} more={<ExpandButton textRef={textRef} setShowFullText={setShowFullText} more />} less={<ExpandButton textRef={textRef} setShowFullText={setShowFullText} />}>
					<Markdown>{text.replace(/<[^>]*>/g, "")}</Markdown>
				</ShowMore>
			</div>
		)
	}
}
