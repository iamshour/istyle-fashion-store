import { DataContext } from "@context/GlobalContext"
import { ADD_TO_FAVORITES, REMOVE_FROM_CART } from "@context/types"
import Image from "next/image"
import Link from "next/link"
import { useContext, useRef } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

export default function CartItem({ item, handleDecrement, handleIncrement }) {
	const { images, price, name, _id } = item.data
	const [{ favorites }, dispatch] = useContext(DataContext)

	const itemRef = useRef()

	const handleOptions = (e) => {
		e.target.classList.add("hide")

		itemRef.current.classList.add("delete")

		setTimeout(() => {
			dispatch({
				type: REMOVE_FROM_CART,
				payload: _id,
			})
		}, 300)

		if (e.target.value.startsWith("move")) {
			!favorites?.includes(_id) &&
				dispatch({
					type: ADD_TO_FAVORITES,
					payload: _id,
				})
		}
	}

	return (
		<div className='item' ref={itemRef}>
			<Link href={`products/${_id}`}>
				<a className='left'>
					<Image
						src={images[0]?.url}
						alt={name}
						layout='fill'
						objectFit='cover'
						priority
					/>
				</a>
			</Link>
			<div className='right'>
				<div className='top'>
					<h3>${price}</h3>
					<label>
						<BsThreeDotsVertical className='icon' />
						<select onChange={handleOptions}>
							<option defaultValue='' style={{ display: "none" }} />
							<option value='delete'>Delete</option>
							<option value='move'>Move to favorites</option>
						</select>
					</label>
				</div>
				<Link href={`products/${_id}`}>
					<a className='item-name'>{name}</a>
				</Link>
				<div className='bottom'>
					<button
						disabled={item.quantity === 1 ? true : false}
						onClick={() => handleDecrement(_id, item)}>
						-
					</button>
					<h4 className='value'>{item.quantity}</h4>
					<button
						disabled={item.quantity === item.data.inStock ? true : false}
						onClick={() => handleIncrement(_id, item)}>
						+
					</button>
				</div>
			</div>
		</div>
	)
}
