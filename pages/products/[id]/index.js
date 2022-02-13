import { useContext } from "react"
import { DataContext } from "@context/GlobalContext"
import { addToCart } from "@context/Actions"
import { getData } from "@utility/axiosCalls"
import ImageSlider from "@comps/products/ImageSlider"

import { BsInfoCircle, BsBagCheck, BsBagPlus } from "react-icons/bs"
import { CgUnavailable } from "react-icons/cg"

const ProductPage = ({ product }) => {
	const [state, dispatch] = useContext(DataContext)
	const { cart } = state

	const outOfStock = product.inStock === 0 ? true : false

	const cartCheck = () => {
		return (
			<button
				onClick={() => dispatch(addToCart(product._id, outOfStock, cart))}
				className={`add-to-cart-btn ${outOfStock ? "disabled-btn" : ""}`}
				disabled={outOfStock ? true : false}>
				{outOfStock ? (
					<>
						<h2>Out of Stock</h2>
						<CgUnavailable className='icon' />
					</>
				) : cart?.includes(product._id) ? (
					<>
						<h2>Added in cart</h2>
						<BsBagCheck className='icon' />
					</>
				) : (
					<>
						<h2>Add to cart</h2>
						<BsBagPlus className='icon' />
					</>
				)}
			</button>
		)
	}

	return (
		<>
			<h1 className='title'>{product?.name}</h1>
			<ImageSlider images={product?.images} />
			<div className='description'>
				<BsInfoCircle className='icon' />
				<p>{product?.description}</p>
			</div>
			<div className='sizes'>
				<h4>Select Size</h4>
				<div className='options'>
					{product.size.map((item) => (
						<label key={item}>
							<input type='radio' name='options' />
							<span>{item}</span>
						</label>
					))}
				</div>
			</div>
			<div className='page-bottom'>
				<h1>${product.price}</h1>
				{cartCheck()}
			</div>
		</>
	)
}

export default ProductPage

export async function getStaticPaths() {
	const { data } = await getData("products")
	const paths = data?.map((item) => ({ params: { id: item?._id } }))
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
