import connectDB from "@utility/connectDB"
import User from "@models/User"

connectDB()

const handler = async (req, res) => {
	if (req.method === "POST") {
		const email = req.body.email
		// const existingUser = await mongoose.models.users.findOne({ email })
		const existingUser = await User.findOne({ email })

		if (existingUser) {
			return res.status(403).json({
				msg: "Account already exists! Sign In instead.",
			})
		}

		return res.status(201).json()
	}
}

export default handler
