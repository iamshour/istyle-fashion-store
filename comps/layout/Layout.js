import Header from "@comps/layout/header"
import Footer from "@comps/layout/footer"
import { useRouter } from "next/router"
import Head from "next/head"
import { customHead, pageClassName, pageTitle } from "@utility/pageUtils"

const Layout = ({ children }) => {
	const router = useRouter()

	const authClassName = router.pathname === "/auth" ? "auth-container" : ""

	return (
		<div className={`app-container ${authClassName}`}>
			<Header />
			<div className={`app-page ${pageClassName(router)}`}>
				<Head>
					<title>{`${pageTitle(router)} | iStyle Fashion Store`}</title>
					{customHead(router)}
				</Head>
				{children}
			</div>
			<Footer />
		</div>
	)
}

export default Layout
