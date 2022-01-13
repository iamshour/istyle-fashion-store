import Header from "@comps/layout/children/Header"
import Footer from "@comps/layout/children/Footer"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
	const router = useRouter()

	return (
		<div
			className={`app-container ${
				router.pathname.startsWith("/auth") ? "auth-container" : ""
			}`}>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
