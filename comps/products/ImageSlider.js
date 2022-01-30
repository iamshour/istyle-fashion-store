import { useState } from "react"
import Modal from "@comps/assets/Modal"
import Image from "next/image"

const ImageSlider = ({ images }) => {
	const [tab, setTab] = useState(0)
	const [openModal, setOpenModal] = useState(false)

	const selected = (index) => {
		if (tab === index) return "selected-img"
		return ""
	}

	return (
		<div className='slider'>
			<Image
				src={images[tab].url}
				alt='Specific product image'
				width={300}
				height={250}
				objectFit='cover'
				className='main-img'
				onClick={() => setOpenModal(true)}
			/>
			<div className='bottom-imgs'>
				{images?.map((image, index) => (
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
			{openModal && (
				<Modal setOpen={setOpenModal}>
					<div className='modal-content-img'>
						<Image
							src={images[tab].url}
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

export default ImageSlider
