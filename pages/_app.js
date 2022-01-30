import Layout from "@comps/layout/Layout"
import "@styles/globals.scss"
import { ContextProvider } from "@context/GlobalContext"
import Notify from "@comps/assets/Notify"
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url) => {
			url !== router.pathname ? setLoading(true) : setLoading(false)
		}
		const handleComplete = (url) => setLoading(false)

		router.events.on("routeChangeStart", handleStart)
		router.events.on("routeChangeComplete", handleComplete)
		router.events.on("routeChangeError", handleComplete)
	}, [router])

	return (
		<SessionProvider session={pageProps.session}>
			<ContextProvider>
				<Notify urlLoading={loading} />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ContextProvider>
		</SessionProvider>
	)
}

export default MyApp
