import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta
						name='description'
						content='Full-Stack E-commerce webapp created using Next.js and MongoDb as the databse. Advanced features such as filtering, sorting, adding products to cart, profile management, admin dashboard, sending emails, transactions using stripe..'
					/>
					<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
					<link rel='manifest' href='/site.webmanifest' />
					<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
					<meta name='msapplication-TileColor' content='#da532c' />
					<meta name='theme-color' content='#ffffff' />
				</Head>
				<body>
					<Main />
					<div id='portal' />
					<NextScript />
				</body>
			</Html>
		)
	}
}
