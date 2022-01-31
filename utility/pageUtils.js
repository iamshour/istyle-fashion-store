export const pageClassName = (link) => {
	const className =
		link.pathname === "/"
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
	return className
}

export const pageTitle = (link) => {
	const title =
		link.pathname === "/"
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
	return title
}

export const authHead = (link) => {
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
	return null
}
