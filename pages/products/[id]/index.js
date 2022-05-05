import { useContext } from "react"
import { DataContext } from "@context/GlobalContext"
import { getData } from "@utility/axiosCalls"
//COMPS
import CartBtn from "@comps/products/singleProduct/CartBtn"
import ImageSlider from "@comps/products/singleProduct/ImageSlider"
//ICONS
import { BsInfoCircle } from "react-icons/bs"

const ProductPage = ({ product }) => {
	const [state, dispatch] = useContext(DataContext)
	const { cart, favorites } = state

	return (
		<>
			<h1 className='title'>{product?.name}</h1>
			<ImageSlider images={product?.images} />
			<section className='info-sec'>
				<div className='description'>
					<BsInfoCircle className='icon' />
					<p>{product?.description}</p>
				</div>
				<h1>${product.price}</h1>
			</section>
			<section className='sizes-sec'>
				<h4>Select Size</h4>
				<div className='options'>
					{product.size.map((item) => (
						<label key={item}>
							<input type='radio' name='options' />
							<span>{item}</span>
						</label>
					))}
				</div>
			</section>
			<section className='btns-sec'>
				<CartBtn
					dispatch={dispatch}
					inStock={product.inStock}
					cart={cart}
					id={product._id}
				/>
			</section>
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
