import { goBackInDate } from "../utils/utils"

const options = { method: "GET", headers: { accept: "application/json", Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}` } }

export async function getGenre(format) {
	if (format) {
		let request = await fetch(`https://api.themoviedb.org/3/genre/${format}/list?language=en&include_adult=false`, options)
		return await request.json()
	} else return ""
}

export async function getDetails(format, page = 1, genreId = "", productionId = "", recommendationsId = "", collectionId = "", topRated = false, upcoming = false, nowPlaying = false, airing = false) {
	let request
	if (recommendationsId) {
		request = await fetch(`https://api.themoviedb.org/3/${format}/${recommendationsId}/recommendations?language=en-US&page=1&include_adult=false`, options)
	} else if (collectionId) {
		request = await fetch(`https://api.themoviedb.org/3/collection/${collectionId}?language=en-US&include_adult=false`, options)
	} else if (topRated || upcoming || nowPlaying || airing) {
		request = await fetch(`https://api.themoviedb.org/3/${format}/${topRated ? "top_rated" : nowPlaying ? "now_playing" : airing ? "airing_today" : "upcoming"}?language=en-US&include_adult=false`, options)
	} else {
		request = await fetch(`https://api.themoviedb.org/3/discover/${format}?certification.lte=PG-13&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&primary_release_date.gte=${!productionId && goBackInDate(3)}&with_genres=${genreId}&with_companies=${productionId}`, options)
	}
	return await request.json()
}

export async function getVideos(id, format, seasonN) {
	let request
	if (seasonN) {
		request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonN}/videos?language=en-US&include_adult=false`, options)
	} else {
		request = await fetch(`https://api.themoviedb.org/3/${format}/${id}/videos?language=en-US&include_adult=false`, options)
	}

	if (request.ok) return (await request.json()).results.filter(vid => vid.type !== "Featurette" && vid.type !== "Clip" && vid.site === "YouTube")
	return [false]
}

export async function getById(id, format, detailed = false) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}?language=en-US&include_adult=false&append_to_response=${detailed && "credits,combined_credits,release_dates,external_ids"}`, options)
	return await request.json()
}

export async function getSeason(id, seasonN) {
	let request = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonN}?language=en-US&include_adult=false`, options)
	return await request.json()
}

export async function getReview(id, format) {
	let request = await fetch(`https://api.themoviedb.org/3/${format}/${id}/reviews?language=en-US&include_adult=false`, options)
	return await request.json()
}

export async function getSuggestions(value, format, genre, period, page = 1) {
	let request = await fetch(`https://api.themoviedb.org/3/search/${format || "multi"}?query=${value}&include_adult=false&language=en-US&page=${page}`, options)
	let result = await request.json()
	return {
		results: result.results.filter(res => (!genre || res.genre_ids?.includes(+genre)) && (!period || new Date(res.release_date || res.first_air_date) >= new Date(goBackInDate({ week: 0.25, month: 1, year: 12 }[period.split("-")[1]])))),
		total_results: result.total_results
	}
}
