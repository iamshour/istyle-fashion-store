import Example from "@models/Example"
import connectDB from "@utility/connectDB"
import { getSession } from "next-auth/react"

connectDB()

export default async (req, res) => {
	const session = await getSession({ req })

	if (req.method === "POST") {
		try {
			if (!session)
				return res
					.status(403)
					.json({ msg: "Unauthuenticated user! Please sign in or register." })

			if (!req.body) return res.status(400).json("Empty!")

			//getting using id .. similar to getting it from req.headers
			const { userId } = session

			const example = new Example(req.body)
			await example.save()
			res.status(201).json("example saved successfully!")
		} catch (err) {
			res.status(500).json({
				error: err,
			})
		}
	}

	if (req.method === "GET") {
		try {
			const examples = await Example.find({})
			res.status(201).json({
				examples,
			})
		} catch (err) {
			res.status(500).json({
				error: "an error occured",
			})
		}
	}
}
