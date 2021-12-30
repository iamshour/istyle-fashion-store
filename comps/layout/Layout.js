import Header from "@comps/layout/children/Header"
import Footer from "@comps/layout/children/Footer"

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
