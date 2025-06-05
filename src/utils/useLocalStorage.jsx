import { useEffect, useState } from "react"

export default function useLocalStorage(key, initValue) {
	let [value, setValue] = useState(_ => JSON.parse(localStorage.getItem(key)) || initValue)
	useEffect(_ => localStorage.setItem(key, JSON.stringify(value)), [value])

	return [value, setValue]
}
