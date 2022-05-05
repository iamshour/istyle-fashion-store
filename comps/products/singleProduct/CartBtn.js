import { addToCart } from "@context/Actions"
//ICONS
import { BsBagCheck, BsBagPlus } from "react-icons/bs"
import { CgUnavailable } from "react-icons/cg"

const CartBtn = ({ dispatch, inStock, cart, id }) => {
	const outOfStock = inStock === 0 ? true : false

	return (
		<button
			onClick={() => dispatch(addToCart(id, outOfStock, cart))}
			className={`add-to-cart-btn ${outOfStock ? "disabled-btn" : ""}`}
			disabled={outOfStock ? true : false}>
			{outOfStock ? (
				<>
					<h2>Out of Stock</h2>
					<CgUnavailable className='icon' />
				</>
			) : cart?.includes(id) ? (
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

export default CartBtn
