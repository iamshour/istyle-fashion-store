import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
//COMPS
import Logo from "@comps/layout/children/Logo"
//ICONS
import { BsBag } from "react-icons/bs"
import HeaderDetailsPage from "./HeaderDetailsPage"
import { ThemeBtn } from "./ThemeBtn"

const Header = () => {
	const [navActive, setNavActive] = useState(false)
	const [customDoc, setCustomDoc] = useState(null)

	const router = useRouter()
	const user = useSession()?.data?.user
	const isDetailsPage = router.pathname === "/products/[id]" ? true : false

	useEffect(() => {
		setCustomDoc(document)
	}, [navActive])

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
		avatar: user
			? user?.image
			: "https://res.cloudinary.com/mooskilee/image/upload/v1643272836/blank-profile-picture-973460_640_caalj3_rb7tte.png",
	}

	useEffect(() => {
		navActive ? customDoc?.querySelector("html")?.style?.overflowY = "hidden" : customDoc?.querySelector("html")?.style?.overflowY = "unset"
	}, [navActive])

	return (
		<header className={isDetailsPage ? "details-page-header" : ""}>
			{isDetailsPage && (
				<HeaderDetailsPage router={router}/>
			)}
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
					<ThemeBtn />
					<Link href='/'>
						<a className='logo' onClick={() => setNavActive(false)}>
							<Logo />
						</a>
					</Link>
				</div>
			</nav>
			<Link href='/cart'>
				<a className={`icon-btn cart-btn ${isActive("/cart")}`}>
					<BsBag className='icon' />
				</a>
			</Link>
		</header>
	)
}

export default Header
