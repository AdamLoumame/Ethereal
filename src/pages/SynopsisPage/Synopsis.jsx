import useSWR from "swr"
import { createContext, useEffect, useState } from "react"
import MainOverview from "./MainOverview"
import Cast from "./Cast"
import { getPalette } from "@/utils/utils"
import Head from "@/components/Head"
import { image780 } from "@/utils/constants"
import Seasons from "./Seasons"
import { useLoaderData } from "react-router-dom"
import Trend from "@/components/Trend"
import ScrollTop from "@/components/ScrollTop"
import Bg from "../../components/Bg"
import Footer from "@/components/Footer"
import Reviews from "./Reviews"
import PersonCredits from "./PersonCredits"
import Episodes from "./Episodes"
import useLocalStorage from "../../utils/useLocalStorage"

export let dataContext = createContext(null)
export default function Synopsis() {
	let { data, format, seasonN } = useLoaderData()
	let { data: colors } = useSWR((data.poster_path || data.profile_path) && `colors${data.id + format + (seasonN || "")}`, _ => getPalette(image780 + (data.poster_path || data.profile_path), Math.random() < 0.5), { suspense: true })

	let [_, setLastBrowsed] = useLocalStorage("lastbrowsed", [])
	useEffect(_ => setLastBrowsed(prev => (format === "tv" || format === "movie") && [...prev.filter(el => el.id !== data.id), { id: data.id, format }].slice(-3)), [Number(data.id) + format])

	return (
		<div className='no-mode'>
			<ScrollTop />
			<Bg colors={colors?.DarkVibrant && [colors.DarkVibrant.hex, colors.Vibrant.hex, colors.Muted.hex, colors.DarkMuted.hex]} />
			<Head searchStyle='frost2' />
			<div className='flex flex-col gap-12'>
				<dataContext.Provider value={{ data, format, seasonN }}>
					<MainOverview />
					{((!seasonN && data.credits?.cast[0]) || data.combined_credits?.cast[0]) && (format === "person" ? <Trend title='Known For' defaultData={data.combined_credits?.cast.sort((c1, c2) => c2.vote_count - c1.vote_count)} defaultId={data.id} addP large /> : <Cast />)}
					{seasonN && <Episodes />}
					{!seasonN && format !== "person" && <Reviews userColor={colors?.Vibrant.hex} />}
					{data?.seasons && <Seasons />}
					{data.production_companies?.[0] && <Trend title={`More From ${data.production_companies[0].name}`} format={format} production={data.production_companies[0]} excludedIds={[data.id]} addP large />}
					{format !== "person" && <Trend title='More Like This' format={format} recommendationsId={data.id} addP large />}
					{data.combined_credits?.cast[0] && <PersonCredits credits={data.combined_credits} />}
				</dataContext.Provider>
				<Footer style='frost2' />
			</div>
		</div>
	)
}
