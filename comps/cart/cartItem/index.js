import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

export default function CartItem({ item }) {
	const [quantity, setQuantity] = useState(1)
	return (
		<div className='item'>
			<Link href={`products/${item._id}`}>
				<a className='left'>
					<Image
						src={item?.images[0]?.url}
						alt={item.name}
						layout='fill'
						objectFit='cover'
					/>
				</a>
			</Link>
			<div className='right'>
				<div className='top'>
					<h3>${item?.price}</h3>
					<label>
						<BsThreeDotsVertical className='icon' />
						<select>
							<option defaultValue='' style={{ display: "none" }} />
							<option value='delete'>Delete</option>
							<option value='move'>Move to favorites</option>
						</select>
					</label>
				</div>
				<Link href={`products/${item._id}`}>
					<a className='item-name'>{item?.name}</a>
				</Link>
				<div className='bottom'>
					<button onClick={() => setQuantity(quantity - 1)}>-</button>
					<h4 className='value'>{quantity}</h4>
					<button onClick={() => setQuantity(quantity + 1)}>+</button>
				</div>
			</div>
		</div>
	)
}
