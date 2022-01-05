import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
//ICONS
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { BiLogOut, BiLogIn } from "react-icons/bi"
import { FiSun } from "react-icons/fi"
import { BsFillMoonFill } from "react-icons/bs"

const Header = () => {
	const router = useRouter()
	const [navActive, setNavActive] = useState(false)
	const user = !null

	const [theme, setTheme] = useState("light")

	useEffect(() => {
		setTheme(localStorage.getItem("theme"))

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
			//styling
			// document.querySelector("body").style.transition =
			// 	"background 250ms ease-in-out, color 250ms ease-in-out"
		} else {
			saveTheme("light")
			// document.querySelector("body").style.transition =
			// 	"background 250ms ease-in-out, color 250ms ease-in-out"
		}
	}

	const isActive = (link) => {
		if (router.pathname === link) {
			return "active"
		} else {
			return ""
		}
	}

	return (
		<header>
			<button
				className={`nav-btn ${navActive ? "nav-active" : ""}`}
				onClick={() => setNavActive((prev) => !prev)}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav>
				<div className='nav-wrapper'>
					<Link href='/'>Profile</Link>
					<Link href='/'>All Products</Link>
					<Link href='/'>Fashion</Link>
					<Link href='/'>Home Appliance</Link>
					<Link href='/'>Tech</Link>
					<Link href='/'>Contact us</Link>
					<Link href='/'>Newsletter</Link>
					<Link href='/'>
						<img
							className='logo'
							src='https://res.cloudinary.com/dniaqkd0y/image/upload/v1640881562/shour-store/app-logo_dowk3q.png'
							alt='shour-store logo'
						/>
					</Link>
					{/* <div className='theme-wrapper'>
						<button onClick={switcher}>
							{theme === "light" ? (
								<BsFillMoonFill className='icon' />
							) : (
								<FiSun className='icon' />
							)}
						</button>
					</div> */}
				</div>
			</nav>
			<Link href='/cart'>
				<a className={`cart ${isActive("/cart")}`}>
					<AiOutlineShoppingCart className='icon' />
				</a>
			</Link>
		</header>
	)
}

export default Header
{
	/* <AiOutlineUser className='icon' /> */
}
