import Image from "next/image"
import Link from "next/link"

const ProductCard = ({ product }) => {
	return (
		<Link href={`products/${product._id}`}>
			<div className='product-card'>
				<Image
					src={product.images[0].url}
					alt={product.name}
					width={200}
					height={240}
					objectFit='cover'
				/>
				<div className='card-details'>
					<h1>{product.name}</h1>
					<h4>$ {product.price}</h4>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
