import ImageSlider from "@comps/products/ImageSlider"
import { getData } from "@utility/axiosCalls"
import { BsInfoCircle } from "react-icons/bs"

const ProductPage = ({ product }) => {
	return (
		<div className='product-details-page'>
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
						<label>
							<input type='radio' name='options' key={item} />
							<span>{item}</span>
						</label>
					))}
				</div>
			</div>
			<div className='page-bottom'>
				<h1>${product.price}</h1>
				<buttom className='add-to-cart-btn'>
					<h2>Add to cart</h2>
				</buttom>
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
