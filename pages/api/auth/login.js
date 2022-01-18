import bcrypt from "bcrypt"
import connectDB from "@utility/connectDB"
import { validate } from "@utility/validation"
import User from "@models/User"

connectDB()

export default async (req, res) => {
	const { method } = req

	switch (method) {
		case "POST":
			await login(req, res)
			break
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res.status(500).json({
				msg: "Please fill in all inputs.",
			})

		const exists = await User.findOne({ email })

		if (!exists)
			return res.status(400).json({
				msg: "Authentication failed. Incorrect credentials.",
			})

		const comparePass = await bcrypt.compare(password, exists.password)

		if (!comparePass)
			return res.status(400).json({
				msg: "Authentication failed. Incorrect credentials.",
			})

		res.status(201).json({
			msg: "Login successfull!",
		})
	} catch (err) {
		res.status(500).json({
			msg: err?.length > 0 ? err : "some error occured, please try again.",
		})
	}
}
