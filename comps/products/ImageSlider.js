import { useState } from "react"
import Modal from "@comps/fragments/Modal"
import Image from "next/image"
import { Carousel } from "react-bootstrap"

const ImageSlider = ({ images }) => {
	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			<div className='carousel-image-container'>
				<Carousel variant='dark' fade>
					{images?.map((image, index) => (
						<Carousel.Item key={index}>
							<div className='carousel-img-wrapper'>
								<Image
									src={image.url}
									alt='Specific product image'
									layout='fill'
									objectFit='cover'
									onClick={() => setOpenModal(true)}
									priority
								/>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
			{openModal && (
				<Modal setOpen={setOpenModal} open={openModal}>
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
		</>
	)
}

export default ImageSlider
