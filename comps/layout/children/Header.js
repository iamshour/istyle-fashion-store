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
	const [_document, set_document] = useState(null)
	const user = !null

	useEffect(() => {
		set_document(document)
	}, [])

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

	if (navActive) {
		_document?.querySelector("html")?.style?.overflowY = "hidden"
	} else {
		_document?.querySelector("html")?.style?.overflowY = "unset"
	}

	return (
		<header>
			<button
				className={`nav-btn ${navActive ? "nav-btn-active" : ""}`}
				onClick={() => setNavActive((prev) => !prev)}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={navActive ? "nav-active" : ""}>
					<Link href='/'>Profile</Link>
					<Link href='/'>All Products</Link>
					<Link href='/'>Men's fashion</Link>
					<Link href='/'>Women's fashion</Link>
					<Link href='/'>Kids fashion</Link>
					<Link href='/'>Contact us</Link>
					<Link href='/'>Newsletter</Link>
					<Link href='/'>
						<img
							className='logo'
							src='https://res.cloudinary.com/dniaqkd0y/image/upload/v1641586025/istyle-fashion-store/istyle-logo_topsp1.png'
							alt='istyle fashion store logo'
						/>
					</Link>
					<button onClick={switcher} className='theme-wrapper'>
						{theme === "light" ? (
							<BsFillMoonFill className='icon' />
						) : (
							<FiSun className='icon' />
						)}
					</button>
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
