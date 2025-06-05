import { FastAverageColor } from "fast-average-color"
import { Vibrant } from "node-vibrant/browser"

export let getAvrColor = async imgSRC => await new FastAverageColor().getColorAsync(imgSRC, { algorithm: "dominant" })
export let getPalette = async imgSRC => await Vibrant.from(imgSRC).getPalette()

export let formatDate = dateString => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
export let formatTime = s => `${[Math.floor(s / 3600) || "", String(Math.floor((s % 3600) / 60)).padStart(2, "0") || "", String(Math.floor(s % 60)).padStart(2, "0")].filter(part => part).join(":")}`
export let formatYears = (b, d) => new Date(d || new Date()).getFullYear() - new Date(b).getFullYear() - (new Date(d || new Date()).getMonth() < new Date(b).getMonth() || (new Date(d || new Date()).getMonth() === new Date(b).getMonth() && new Date(d || new Date()).getDate() <= new Date(b).getDate()))
export let goBackInDate = months => new Date(new Date().setDate(new Date().getDate() - 30 * months)).toISOString().split("T")[0]

export let sortBasedOnDate = arr => arr.sort((c1, c2) => isNaN(new Date(c1.release_date)) - isNaN(new Date(c2.release_date)) || new Date(c2.release_date) - new Date(c1.release_date))
export let eliminateDuplicates = (arr, filteringParam) => arr.filter((el, i, arr) => arr.findIndex(el2 => el2[filteringParam] === el[filteringParam]) === i)
export let capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

export let toggleParam = (param, searchParams, setSearchParams) => {
	let option = ["movie", "tv", "person"].includes(param) ? "format" : !isNaN(Number(param)) ? "genre" : param.slice(0, 4) === "this" ? "period" : "q"
	if (Object.values(Object.fromEntries(searchParams.entries())).includes(param)) {
		let { [option]: removedParam, [option === "format" && "genre"]: removedGenre, ...restOfParams } = Object.fromEntries(searchParams.entries())
		setSearchParams(restOfParams)
	} else {
		setSearchParams(prev => {
			let { [param === "person" && "period"]: removedPeriod, [option === "format" && "genre"]: removedGenre, ...finalParams } = Object.fromEntries(prev.entries())
			return { ...finalParams, [option]: param }
		})
	}
}
