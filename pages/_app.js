import Layout from "@comps/layout/Layout"
import "@styles/globals.scss"
import { ContextProvider } from "@context/GlobalContext"
import Notify from "@comps/temporary/Notify"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<ContextProvider>
				<Notify />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ContextProvider>
		</SessionProvider>
	)
}

export default MyApp
