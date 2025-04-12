import useSWR from "swr"
import { getById } from "@/services/api"
import { createContext, useEffect, useState } from "react"
import MainOverview from "./MainOverview"
import Cast from "./Cast"
import { getPalette } from "@/utils/utils"
import Head from "./Head"
import { image780 } from "@/utils/constants"
import Seasons from "./Seasons"
import { useParams } from "react-router-dom"
import Trend from "@/components/Trend"
import ScrollTop from "@/components/ScrollTop"
import Bg from "../../components/Bg"
import Footer from "@/components/Footer"
import Reviews from "./Reviews"
import PersonCredits from "./PersonCredits"
import Episodes from "./Episodes"

export let dataContext = createContext(null)
export default function Synopsis() {
	let { format, id, seasonN } = useParams()
	let { data } = useSWR(id, _ => getById(id, format, true), { suspense: true })

	if (seasonN) {
		let seasonData = data.seasons.filter(s => s.season_number == seasonN)[0]
		data = {
			...seasonData,
			id: data.id,
			season_id: seasonData.id,
			title: data.name,
			season_name: seasonData.name,
			production_companies: data.production_companies
		}
	}

	let [isImgLoaded, setisImgLoaded] = useState(false)
	let { data: colors } = useSWR((data.poster_path || data.profile_path) && isImgLoaded && `colors${id + format + (seasonN || "")}`, _ => getPalette(image780 + (data.poster_path || data.profile_path)), { suspense: true })

	if (data.combined_credits) data.combined_credits.cast = data.combined_credits?.cast.filter((c, i, arr) => arr.findIndex(f => f.id === c.id) === i)
	return (
		<div className='no-mode'>
			<ScrollTop />
			{colors && <Bg colors={[colors.DarkVibrant.hex, colors.Vibrant.hex, colors.Muted.hex, colors.DarkMuted.hex]} />}
			<Head />
			<div className='flex flex-col gap-12'>
				<dataContext.Provider value={{ data, format, seasonN }}>
					<MainOverview setisImgLoaded={setisImgLoaded} />
					{((!seasonN && data.credits?.cast[0]) || data.combined_credits?.cast[0]) && (format === "person" ? <Trend title='Known For' defaultData={data.combined_credits?.cast.sort((c1, c2) => c2.vote_count - c1.vote_count)} defaultId={id} addP large /> : <Cast />)}
					{seasonN && <Episodes />}
					{!seasonN && format !== "person" && <Reviews userColor={colors?.Vibrant.hex} />}
					{data?.seasons && <Seasons />}
					{data.production_companies?.[0] && <Trend title={`More From ${data.production_companies[0].name}`} format={format} productionId={data.production_companies[0].id} excludedIds={[id]} addP large />}
					{format !== "person" && <Trend title='More Like This' format={format} recommendationsId={data.id} addP large />}
					{data.combined_credits?.cast[0] && <PersonCredits credits={data.combined_credits} />}
				</dataContext.Provider>
				<Footer />
			</div>
		</div>
	)
}
