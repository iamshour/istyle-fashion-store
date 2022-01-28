import Modal from "@comps/temporary/Modal"
import { getData } from "@utility/axiosCalls"
import Image from "next/image"
import { useState } from "react"

const ProductPage = ({ product }) => {
	const [tab, setTab] = useState(0)
	const [openModal, setOpenModal] = useState(false)

	const selected = (index) => {
		if (tab === index) return "selected-img"
		return ""
	}

	return (
		<div className='product-details-page'>
			<h1>{product?.name}</h1>
			<p>{product?.description}</p>
			<div className='slider'>
				<Image
					src={product.images[tab].url}
					alt='Specific product image'
					width={300}
					height={250}
					objectFit='cover'
					className='main-img'
					onClick={() => setOpenModal(true)}
				/>
				<div className='bottom-imgs'>
					{product?.images?.map((image, index) => (
						<div className={`img-small ${selected(index)}`} key={index}>
							<Image
								src={image.url}
								alt='Specific product image'
								width={62}
								height={62}
								layout='fixed'
								objectFit='cover'
								onClick={() => setTab(index)}
							/>
						</div>
					))}
				</div>
			</div>
			{openModal && (
				<Modal setOpen={setOpenModal}>
					<div className='modal-content-img'>
						<Image
							src={product.images[tab].url}
							alt='Specific product image'
							layout='fill'
							objectFit='cover'
						/>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default ProductPage

export async function getStaticPaths() {
	const { data } = await getData("products")
	const paths = data.map((item) => ({ params: { id: item._id } }))
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
