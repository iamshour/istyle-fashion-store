import { useEffect, useState } from "react"
import { BsFillMoonFill } from "react-icons/bs"
import { FiSun } from "react-icons/fi"

export const ThemeBtn = () => {
	const [theme, setTheme] = useState("light")

	useEffect(() => {
		setTheme(
			localStorage.getItem("theme")
				? localStorage.getItem("theme")
				: localStorage?.setItem("theme", theme)
		)

		document.documentElement.setAttribute("data-theme", theme)
	}, [theme])

	const saveTheme = (theme) => {
		setTheme(theme)
		localStorage.setItem("theme", theme)
		document.documentElement.setAttribute("data-theme", theme)
	}

	const switcher = () => {
		if (theme === "light") {
			saveTheme("dark")
			document.querySelector("body").style.transition =
				"background 250ms ease-in-out, color 250ms ease-in-out"
		} else {
			saveTheme("light")
			document.querySelector("body").style.transition =
				"background 250ms ease-in-out, color 250ms ease-in-out"
		}
	}

	return (
		<button
			onClick={switcher}
			className={`theme-wrapper ${theme === "dark" ? "active" : ""}`}>
			{theme === "light" ? (
				<BsFillMoonFill className='icon' />
			) : (
				<FiSun className='icon' />
			)}
		</button>
	)
}
