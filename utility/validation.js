const emailValidation = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	return String(email).toLowerCase().match(regex)
}

const passValidation = (password) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

	return String(password).match(regex)
}

export const validate = (name, email, password, confirmPassword) => {
	if (!name || !email || !password || !confirmPassword) return "Please fill in all inputs"

	if (!emailValidation(email)) return "Please enter a valid email"

	if (password !== confirmPassword) return "Passwords do not match!"

	if (!passValidation(password))
		return "Your password must have more than 8 characters, with at least one number & one special character"
}
