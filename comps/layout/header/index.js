import Link from "next/link"
import { useRouter } from "next/router"
//ICONS
import { BsBag } from "react-icons/bs"
import HeaderDetailsPage from "./HeaderDetailsPage"
import Nav from "./children/Nav"
import { useContext } from "react"
import { DataContext } from "@context/GlobalContext"

const Header = () => {
	const router = useRouter()
	const [{ cart }, dispatch] = useContext(DataContext)

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
					{cart?.length > 0 && <span className='badge'>{cart?.length}</span>}
					<BsBag className='icon' />
				</a>
			</Link>
		</header>
	)
}

export default Header
