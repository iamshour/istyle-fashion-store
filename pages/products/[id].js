import { getData } from "@utility/axiosCalls"
import Image from "next/image"

const ProductPage = ({ product }) => {
	return (
		<div>
			<div>
				<h1>{product?.name}</h1>
				<p>{product?.description}</p>
				{product?.images?.map((image, index) => (
					<Image
						src={image.url}
						alt='Specific product image'
						width={200}
						height={240}
						objectFit='cover'
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductPage

export async function getStaticPaths() {
	const { data } = await getData("products")
	const paths = data.map((item) => ({ params: { id: item._id } }))
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const { data } = await getData(`products/${params.id}`)
	return {
		props: {
			product: data,
		},
		revalidate: 3600,
	}
}
