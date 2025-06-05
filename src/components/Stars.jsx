import Star from "./Star"

export default function Stars({ rating, id }) {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => {
				let w = Math.max(0, Math.min(((Math.floor(rating * 10) - 20 * i) * 100) / 20, 100))
				return <Star key={i + id} id={i + id} width={`${w}%`} />
			})}
		</>
	)
}
