import connectDB from "@utility/connectDB"
// import mongoose from "mongoose"
import User from "@models/User"

connectDB()

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const email = req.body.email

			// const existingUser = await mongoose.models.users.findOne({ email })
			const existingUser = await User.findOne({ email })

			if (!existingUser) {
				return res.status(404).json({
					msg: "Account not found! Sign up instead.",
				})
			}

			res.status(201).json()
		} catch (err) {
			res.status(500).json({
				error: err,
			})
		}
	}
}
