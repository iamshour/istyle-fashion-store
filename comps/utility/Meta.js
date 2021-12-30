import Head from "next/head"

const Meta = ({ title }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta
				name='description'
				content='Full-Stack E-commerce webapp created using Next.js and MongoDb as the databse. Advanced features such as filtering, sorting, adding products to cart, profile management, admin dashboard, sending emails, transactions using stripe..'
			/>
			<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
			<link rel='manifest' href='/site.webmanifest' />
			<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#2d8ec1' />
			<meta name='msapplication-TileColor' content='#00aba9' />
			<meta name='theme-color' content='#ffffff' />
		</Head>
	)
}

export default Meta
