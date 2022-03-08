import { addToFavorites } from "@context/Actions"
import { DataContext } from "@context/GlobalContext"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { BsSuitHeartFill } from "react-icons/bs"

const ProductCard = ({ product }) => {
	const [state, dispatch] = useContext(DataContext)
	const { cart, favorites } = state

	const favoritesCheck = (productId) => {
		return (
			<button
				className={`favorites-btn ${favorites?.includes(productId) ? "fav-added" : ""}`}
				onClick={() => dispatch(addToFavorites(productId, favorites))}>
				<BsSuitHeartFill className='icon' />
			</button>
		)
	}

	return (
		<div className='product-card'>
			<div className='card-top'>
				<Link href={`products/${product._id}`}>
					<div className='cardImg-container'>
						<Image
							src={product.images[0].url}
							alt={product.name}
							layout='fill'
							objectFit='cover'
							placeholder='blur'
							blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABLUExURf/03//33/fv2O/o0ca/rcbBrcC5qK6pmci/qJqVh5mUhsm/os3An4WBdZiSgHVyZratjWxpX8m9kl1aUFlWTVVTS1FPR9/Oj9vKizhUkrcAAAAZdFJOUzCAgoSQkJKYmJ+goKeoqa+vtLm7vb/C4eNfg/3dAAAANElEQVQI12NghAMGwkxWYV5ONn4+EJNXWIRfUFQMxOSREBfiYmYCMTkEBLjZ2VlYiDAMAQB6NgHHK2kEEwAAAABJRU5ErkJggg=='
							priority
						/>
					</div>
				</Link>
				{favoritesCheck(product._id)}
			</div>
			<Link href={`products/${product._id}`}>
				<div className='card-bottom'>
					<p>{product.name}</p>
					<h4>$ {product.price}</h4>
				</div>
			</Link>
		</div>
	)
}

export default ProductCard
