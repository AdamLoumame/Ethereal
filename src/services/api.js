const options = { method: "GET", headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}` } }
export async function getGenre(format) {
	let request = await fetch(`https://api.themoviedb.org/3/certification/${format}/list?language=en`, options)
	return await request.json()
}

export async function getTrending(format) {
	let lastWeekFormatted = new Date(new Date().setDate(new Date().getDate() - 30 * 3)).toISOString().split("T")[0]

	let request = await fetch(`https://api.themoviedb.org/3/discover/${format}?certification.lte=PG-13&certification_country=US&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${lastWeekFormatted}`, options)
	return await request.json()
}

export async function getTrailer(id, format) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}/videos?language=en-US`, options)
	let result = await request.json()
	return result.results.filter(vid => vid.type === "Trailer")
}

export async function getById(id, format) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}?language=en-US`, options)
	return await request.json()
}
