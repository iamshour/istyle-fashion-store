import Header from "@comps/layout/children/Header"
import Footer from "@comps/layout/children/Footer"

const Layout = ({ children }) => {
	return (
		<div className='app-container'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
