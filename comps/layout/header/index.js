import Link from "next/link"
import { useRouter } from "next/router"
//ICONS
import { BsBag } from "react-icons/bs"
import HeaderDetailsPage from "./HeaderDetailsPage"
import Nav from "./Nav"

const Header = () => {
	const router = useRouter()
	const isDetailsPage = router.pathname.startsWith("/products/[id]")
		? "details-page-header"
		: ""

	const isActive = (link) => {
		if (router.pathname === link) {
			return "active"
		} else {
			return ""
		}
	}

	return (
		<header className={isDetailsPage}>
			{isDetailsPage && <HeaderDetailsPage router={router} />}
			<Nav isActive={isActive} />
			<Link href='/cart'>
				<a className={`icon-btn cart-btn ${isActive("/cart")}`}>
					<BsBag className='icon' />
				</a>
			</Link>
		</header>
	)
}

export default Header
