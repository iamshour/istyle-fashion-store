import { addToCart, addToFavorites } from "@context/Actions"
import { DataContext } from "@context/GlobalContext"
import { useContext } from "react"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

const HeaderDetailsPage = ({ router }) => {
	const [state, dispatch] = useContext(DataContext)
	const { favorites } = state
	const productId = router.query.id

	const favStatus = () => {
		return (
			<button
				className='icon-btn'
				onClick={() => dispatch(addToFavorites(productId, favorites))}>
				{favorites.includes(productId) ? (
					<BsSuitHeartFill className='icon icon-pressed' />
				) : (
					<BsSuitHeart className='icon' />
				)}
			</button>
		)
	}

	return (
		<>
			<button onClick={() => router.back()} className='icon-btn'>
				<HiOutlineArrowNarrowLeft className='icon' />
			</button>
			{favStatus()}
		</>
	)
}

export default HeaderDetailsPage
