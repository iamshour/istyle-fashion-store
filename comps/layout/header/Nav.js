import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
//COMPS
import { ThemeBtn } from "./ThemeBtn"
import Logo from "@comps/fragments/Logo"

const Nav = ({ isActive }) => {
	const user = useSession()?.data?.user
	const [navActive, setNavActive] = useState(false)

	useEffect(() => {
		if (navActive) {
			document.querySelector("html").style.overflowY = "hidden"
		} else {
			document.querySelector("html").style.overflowY = "visible"
		}
	}, [navActive])

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
				: "https://res.cloudinary.com/mooskilee/image/upload/v1643272836/blank-profile-picture-973460_640_caalj3_rb7tte.png",
	}

	const NavActiveClassName = navActive ? "active" : ""

	return (
		<>
			<button
				className={`nav-btn ${NavActiveClassName}`}
				onClick={() => {
					setNavActive((prev) => !prev)
				}}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={NavActiveClassName}>
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
		</>
	)
}

export default Nav
