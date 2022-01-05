const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<footer>
			<div className='wrapper'>
				Copyright &copy; {year}{" "}
				<a href='https://iamshour.com' target='_blank' rel='noreferrer noopener'>
					iamshour
				</a>
				. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
