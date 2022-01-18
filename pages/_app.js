import Layout from "@comps/layout/Layout"
import "@styles/globals.scss"
import { ContextProvider } from "@context/GlobalContext"
import Notify from "@comps/temporary/Notify"

function MyApp({ Component, pageProps }) {
	return (
		<ContextProvider>
			<Notify />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ContextProvider>
	)
}

export default MyApp
