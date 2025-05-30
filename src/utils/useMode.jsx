import useLocalStorage from "../utils/useLocalStorage"
import { useEffect } from "react"

export default function useMode() {
	let [isDark, setIsDark] = useLocalStorage("mode", false)

	useEffect(
		_ => {
			isDark ^ document.documentElement.classList.contains("dark") && document.documentElement.classList.toggle("dark")
		},
		[isDark]
	)
    
    return [isDark, setIsDark]
}
