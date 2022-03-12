import { getData } from "@utility/axiosCalls"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DataContext } from "@context/GlobalContext"
import CartItem from "@comps/cart/cartItem"
import Checkout from "@comps/cart/checkout"

export default function Cart() {
	const [{ cart }, dispatch] = useContext(DataContext)
	const [cartItems, setCartItems] = useState([])
	const [balance, setBalance] = useState(0)

	useEffect(() => {
		if (cart?.length > 0) {
			let itemsArr = []

			const getProducts = async () => {
				for (const id of cart) {
					const { data } = await getData(`products/${id}`)
					// itemsArr.push(data)
					itemsArr.push({ data, quantity: 1 })
				}

				setCartItems(itemsArr)
			}

			getProducts()
		}
	}, [cart])

	useEffect(() => {
		const totalPrices = cartItems.reduce((prev, current) => {
			return prev + current.data.price * current.quantity
		}, 0)

		setBalance(totalPrices)
	}, [cartItems])

	if (cart.length === 0) return <div className='empty'>Cart Is Empty</div>

	const sorting = cartItems.sort((a, b) => {
		return a.data.price - b.data.price > 0 ? 1 : -1
	})

	const handleDecrement = (id, product) => {
		const newArr = cartItems.filter((i) => {
			return i.data._id !== id
		})
		newArr.push({ data: product.data, quantity: product.quantity - 1 })
		setCartItems(newArr)
	}
	const handleIncrement = (id, product) => {
		const newArr = cartItems.filter((i) => {
			return i.data._id !== id
		})
		newArr.push({ data: product.data, quantity: product.quantity + 1 })
		setCartItems(newArr)
	}

	return (
		<>
			<section className='items-section'>
				<h1>Shopping Cart</h1>
				<div className='container'>
					{sorting?.map((item) => (
						<CartItem
							key={item?.data._id}
							item={item}
							handleDecrement={handleDecrement}
							handleIncrement={handleIncrement}
						/>
					))}
				</div>
			</section>
			<section className='checkout-section'>
				<Checkout balance={balance} />
			</section>
		</>
	)
}
