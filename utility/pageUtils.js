export const pageClassName = (link) => {
	return link.pathname === "/"
		? "home-page"
		: link.pathname === "/auth"
		? "auth-page"
		: link.pathname === "/cart"
		? "cart-page"
		: link.pathname === "/products"
		? "products-page"
		: link.pathname === "/products/[id]"
		? "single-product-page"
		: link.pathname === "/profile"
		? "profile-page"
		: ""
}

export const pageTitle = (link) => {
	return link.pathname === "/"
		? "Home"
		: link.pathname === "/auth"
		? "Sign In"
		: link.pathname === "/cart"
		? "Cart"
		: link.pathname === "/products"
		? "Products"
		: link.pathname === "/products/[id]"
		? "Product details"
		: link.pathname === "/profile"
		? "Profile"
		: ""
}

export const customHead = (link) => {
	if (link.pathname === "/auth") {
		return (
			<>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
					rel='stylesheet'
				/>
			</>
		)
	}
	if (link.pathname === "/products/[id]") {
		return (
			<link
				rel='stylesheet'
				href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
				integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
				crossOrigin='anonymous'
			/>
		)
	}
	return null
}
