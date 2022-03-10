import { getData } from "@utility/axiosCalls"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "@context/GlobalContext"
import CartItem from "@comps/cart/cartItem"

export default function Cart() {
	const [{ cart }, dispatch] = useContext(DataContext)
	const [cartItems, setCartItems] = useState([])
	const [balance, setBalance] = useState(0)
	console.log(cartItems)

	useEffect(() => {
		cartItems.forEach((item) => {
			setBalance((prev) => prev + item.price)
		})
	}, [cartItems])

	useEffect(() => {
		const cartPromises = cart.map(async (id) => {
			const { data } = await getData(`products/${id}`)
			return data
		})

		const getProducts = async () => {
			const items = await Promise.all(cartPromises)
			setCartItems(items)
		}

		getProducts()
	}, [cart])

	if (cart.length === 0) return <div className='empty'>Cart Is Empty</div>

	return (
		<>
			<section className='items-section'>
				<h1>Shopping Cart</h1>
				<div className='container'>
					{cartItems?.map((item) => (
						<CartItem key={item?._id} item={item} />
					))}
				</div>
			</section>
			<section className='checkout-section'>
				<div className='balance'>
					<h1>Your Balance</h1>
					<p>{balance}</p>
				</div>
				<button className='btn btn-medium'>Checkout</button>
			</section>
		</>
	)
}
