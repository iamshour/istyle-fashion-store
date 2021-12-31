import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
//ICONS
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { BiLogOut, BiLogIn } from "react-icons/bi"

const Header = () => {
	const router = useRouter()
	const [openDropdown, setOpenDropdown] = useState(false)
	const user = !null

	const isActive = (link) => {
		if (router.pathname === link) {
			return "active"
		} else {
			return ""
		}
	}

	return (
		<header>
			<Link href='/'>
				<img
					className='logo'
					src='https://res.cloudinary.com/dniaqkd0y/image/upload/v1640881562/shour-store/app-logo_dowk3q.png'
					alt='shour-store logo'
					onClick={() => setOpenDropdown(false)}
				/>
			</Link>
			<div className='right-section'>
				<Link href='/cart'>
					<a
						className={`cart ${isActive("/cart")}`}
						onClick={() => setOpenDropdown(false)}>
						<AiOutlineShoppingCart className='icon' />
						<h2>Cart</h2>
					</a>
				</Link>
				<button
					className={`dropdown ${isActive("/profile")}`}
					onClick={() => setOpenDropdown((prev) => !prev)}>
					{openDropdown ? (
						<IoIosCloseCircleOutline className='icon' />
					) : (
						<AiOutlineUser className='icon' />
					)}
					<h2>Profile</h2>
				</button>
			</div>
			{openDropdown && (
				<div className='dropdown-box'>
					{user ? (
						<>
							{!router.pathname.startsWith("/profile") && (
								<Link href='/profile'>
									<a className='link' onClick={() => setOpenDropdown((prev) => !prev)}>
										<CgProfile className='icon' />
										<p>View Profile</p>
									</a>
								</Link>
							)}
							<button className='link' onClick={() => setOpenDropdown((prev) => !prev)}>
								<BiLogOut className='icon' />
								<p>Sign out</p>
							</button>
						</>
					) : (
						<Link href='/auth'>
							<a className='link' onClick={() => setOpenDropdown((prev) => !prev)}>
								<BiLogIn className='icon' />
								<p>Sign in</p>
							</a>
						</Link>
					)}
				</div>
			)}
		</header>
	)
}

export default Header
