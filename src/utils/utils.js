import { FastAverageColor } from "fast-average-color"
import { Vibrant } from "node-vibrant/browser"

let fac = new FastAverageColor()

export let getAvrColor = async imgSRC => await fac.getColorAsync(imgSRC, { algorithm: "dominant" })
export let getPalette = async imgSRC => await Vibrant.from(imgSRC).getPalette()

export let formatDate = dateString => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
export let formatTime = s => `${[Math.floor(s / 3600) || "", String(Math.floor((s % 3600) / 60)).padStart(2, "0") || "", String(Math.floor(s % 60)).padStart(2, "0")].filter(part => part).join(":")}`
export let formatYears = (b, d) => new Date(d || new Date()).getFullYear() - new Date(b).getFullYear() - (new Date(d || new Date()).getMonth() < new Date(b).getMonth() || (new Date(d || new Date()).getMonth() === new Date(b).getMonth() && new Date(d || new Date()).getDate() <= new Date(b).getDate()))

export let sortBasedOnDate = arr => arr.sort((c1, c2) => isNaN(new Date(c1.release_date)) - isNaN(new Date(c2.release_date)) || new Date(c2.release_date) - new Date(c1.release_date))
