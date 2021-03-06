import ProductCard from "@comps/products/productCard"
import { getData } from "@utility/axiosCalls"
import { useState } from "react"

const Products = ({ data }) => {
	const [products, setProducts] = useState(data)

	if (products?.length === 0) {
		return <h1>Noo products available at the moment!!</h1>
	}

	return (
		<div className='container'>
			{products.map((product) => (
				<ProductCard key={product._id} product={product} />
			))}
		</div>
	)
}

export default Products

export async function getServerSideProps() {
	const { data } = await getData("products")
	return {
		props: {
			data,
		},
	}
}
