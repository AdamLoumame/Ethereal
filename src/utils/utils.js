import { FastAverageColor } from "fast-average-color"

let fac = new FastAverageColor()
export let getAvrColor = async imgSRC => await fac.getColorAsync(imgSRC, { algorithm: "dominant" })
