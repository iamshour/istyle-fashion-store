import { createPortal } from "react-dom"
import { useState, useEffect } from "react"

const Modal = ({ children, setOpen }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleClose = (e) => {
		if (e.target.classList.contains("modal-backdrop")) return setOpen(false)
	}

	return mounted
		? createPortal(
				<div className='modal-backdrop' onClick={handleClose}>
					{children}
				</div>,
				document.querySelector("#portal")
		  )
		: null
}

export default Modal
