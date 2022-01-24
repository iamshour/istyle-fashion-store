import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Logo from "@comps/layout/children/Logo"
import { useSession } from "next-auth/react"
//ICONS
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BsFillMoonFill } from "react-icons/bs"
import { FiSun } from "react-icons/fi"

const Header = () => {
	const router = useRouter()
	const [navActive, setNavActive] = useState(false)
	const [customDoc, setCustomDoc] = useState(null)
	const [theme, setTheme] = useState("light")
	
	const user = useSession()?.data?.user

	useEffect(() => {
		setCustomDoc(document)
	}, [navActive])

	useEffect(() => {
		setTheme(
			localStorage.getItem("theme")
				? localStorage.getItem("theme")
				: localStorage?.setItem("theme", theme)
		)

		document.documentElement.setAttribute("data-theme", theme)
	}, [theme, router.pathname])

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

	const isActive = (link) => {
		if (router.pathname === link) {
			return "active"
		} else {
			return ""
		}
	}

	const links = [
		{ link: "/", title: "Home" },
		{ link: "/products", title: "All Products" },
		{ link: "/men", title: "Men's fashion" },
		{ link: "/women", title: "Women's fashion" },
		{ link: "/kids", title: "Kid's fashion" },
		{ link: "/contact", title: "Contact Us" },
		{ link: "#newsletter", title: "Newsletter" },
	]

	const profile = {
		link: user ? "/profile" : "/auth",
		title: user ? user?.name : "Sign in",
		avatar:
			user && user?.image
				? user?.image
				: "https://res.cloudinary.com/dniaqkd0y/image/upload/v1639408597/blank-profile-picture-973460_640_caalj3.png",
	}

	useEffect(() => {
		navActive ? customDoc?.querySelector("html")?.style?.overflowY = "hidden" : customDoc?.querySelector("html")?.style?.overflowY = "unset"
	}, [navActive])

	return (
		<header>
			<button
				className={`nav-btn ${navActive ? "nav-btn-active" : ""}`}
				onClick={() => {
					setNavActive((prev) => !prev)
				}}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={navActive ? "nav-active" : ""}>
				<Link href={profile.link}>
					<div className='profile-btn' onClick={() => setNavActive(false)}>
						<div className='img'>
							<Image src={profile.avatar} width={45} height={45} objectFit='cover' />
						</div>
						<h4>{profile.title}</h4>
					</div>
				</Link>
				<div className='nav-links'>
					{links?.map((item, index) => (
						<Link href={item.link} key={index}>
							<h4 className={isActive(item.link)} onClick={() => setNavActive(false)}>
								{item.title}
							</h4>
						</Link>
					))}
				</div>
				<div className='nav-bottom'>
					<button
						onClick={switcher}
						className={`theme-wrapper ${theme === "dark" ? "active" : ""}`}>
						{theme === "light" ? (
							<BsFillMoonFill className='icon' />
						) : (
							<FiSun className='icon' />
						)}
					</button>
					<Link href='/'>
						<a className='logo' onClick={() => setNavActive(false)}>
							<Logo />
						</a>
					</Link>
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
