const options = { method: "GET", headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}` } }
let lastWeekFormatted = new Date(new Date().setDate(new Date().getDate() - 30 * 3)).toISOString().split("T")[0]

export async function getGenre(format) {
	let request = await fetch(`https://api.themoviedb.org/3/genre/${format}/list?language=en`, options)
	return await request.json()
}

export async function getTrending(format, genreId = "", productionId = "", castId = "", recommendationsId = "", collectionId = "") {
	let request
	if (recommendationsId) {
		request = await fetch(`https://api.themoviedb.org/3/${format}/${recommendationsId}/recommendations?language=en-US&page=1`, options)
	} else if (collectionId) {
		request = await fetch(`https://api.themoviedb.org/3/collection/${collectionId}?language=en-US`, options)
	} else {
		request = await fetch(`https://api.themoviedb.org/3/discover/${format}?certification.lte=PG-13&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${!productionId && lastWeekFormatted}&with_genres=${genreId}&with_companies=${productionId}&with_cast=${castId}`, options)
	}
	return await request.json()
}

export async function getVideos(id, format, seasonN) {
	let request
	if (seasonN) {
		request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonN}/videos?language=en-US`, options)
	} else {
		request = await fetch(`https://api.themoviedb.org/3/${format}/${id}/videos?language=en-US`, options)
	}

	if (request.ok) return (await request.json()).results.filter(vid => vid.type !== "Featurette" && vid.type !== "Clip" && vid.site === "YouTube")
	return [false]
}

export async function getById(id, format, detailed = false) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}?language=en-US&append_to_response=${detailed && "credits,combined_credits,release_dates,external_ids"}`, options)
	return await request.json()
}

export async function getSeason(id, seasonN) {
	let request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonN}?language=en-US`, options)
	return await request.json()
}

export async function getReview(id, format) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}/reviews?language=en-US`, options)
	return await request.json()
}

export async function getSuggestions(value) {
	let request = await fetch(`https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=en-US&page=1`, options)
	return await request.json()
}
