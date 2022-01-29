import { useState } from "react"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

const HeaderDetailsPage = ({ router }) => {
	const [favAdded, setFavAdded] = useState(false)

	return (
		<>
			<button onClick={() => router.back()} className='icon-btn'>
				<HiOutlineArrowNarrowLeft className='icon' />
			</button>
			<button className='icon-btn' onClick={() => setFavAdded((prev) => !prev)}>
				{favAdded ? (
					<BsSuitHeartFill className='icon icon-pressed' />
				) : (
					<BsSuitHeart className='icon' />
				)}
			</button>
		</>
	)
}

export default HeaderDetailsPage
