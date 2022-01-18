import Logo from "@comps/layout/children/Logo"
import Link from "next/link"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
	const year = new Date().getFullYear()

	const links = [
		{ link: "/", title: "Home" },
		{ link: "/contact", title: "Contact Us" },
		{ link: "#newsletter", title: "Newsletter" },
	]
	const categories = [
		{ link: "/products", title: "All Products" },
		{ link: "/men", title: "Men's fashion" },
		{ link: "/women", title: "Women's fashion" },
		{ link: "/kids", title: "Kid's fashion" },
	]
	const socials = [
		{
			icon: <FaFacebook className='icon' />,
			link: "https://facebook.com",
		},
		{
			icon: <FaInstagram className='icon' />,
			link: "https://instagram.com",
		},
		{
			icon: <AiFillTwitterCircle className='icon' />,
			link: "https://twitter.com",
		},
	]

	return (
		<footer>
			<div className='footer-container'>
				<div className='left'>
					<Link href='/'>
						<a className='logo'>
							<Logo />
						</a>
					</Link>
					<p>
						Modern wearables and trendy collections, happily serving our customers since
						2014
					</p>
				</div>
				<div className='right'>
					<div className='list-group'>
						<h1>Categories</h1>
						<div className='links'>
							{categories.map((item, index) => (
								<Link href={item.link} key={index}>
									<h4>{item.title}</h4>
								</Link>
							))}
						</div>
					</div>
					<div className='list-group'>
						<h1>Helpful links</h1>
						<div className='links'>
							{links.map((item, index) => (
								<Link href={item.link} key={index}>
									<h4>{item.title}</h4>
								</Link>
							))}
						</div>
					</div>
					<div className='list-group'>
						<h1>Follow us!</h1>
						<div className='socials'>
							{socials.map((item, index) => (
								<a href={item.link} key={index} target='_blank' rel='noreferrer noopener'>
									{item.icon}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='footer-bottom'>
				Copyright &copy; {year}{" "}
				<a
					href='https://iamshour.com'
					target='_blank'
					rel='noreferrer noopener'
					className='iamshour-link'>
					iamshour
				</a>
				. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
