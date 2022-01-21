import bcrypt from "bcrypt"
import clientPromise from "@utility/mongodb"
import { validate } from "@utility/validation"
import User from "@models/User"

clientPromise()

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const { name, email, password, confirmPassword } = req.body

			const invalidMessage = validate(name, email, password, confirmPassword)

			if (invalidMessage)
				return res.status(500).json({
					msg: invalidMessage,
				})

			const exists = await User.findOne({ email })

			if (exists)
				return res.status(400).json({
					msg: "Authentication failed. Try using another email.",
				})

			const hashPass = await bcrypt.hash(password, 12)

			const user = new User({ name, email, password: hashPass })

			await user.save()

			res.status(201).json({
				msg: "Registration successfull!",
			})
		} catch (err) {
			res.status(500).json({
				msg: err?.length > 0 ? err : "some error occured, please try again.",
			})
		}
	}
}
