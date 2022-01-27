import ProductCard from "@comps/products/ProductCard"
import { getData } from "@utility/axiosCalls"
import { useState } from "react"

const Products = ({ data }) => {
	const [products, setProducts] = useState(data)

	return (
		<div className='products-page'>
			<div className='container'>
				{products?.length === 0 ? (
					<h1>No products available at the moment</h1>
				) : (
					products.map((product) => <ProductCard key={product._id} product={product} />)
				)}
			</div>
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
