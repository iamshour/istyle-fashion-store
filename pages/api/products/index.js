import connectDB from "@utility/connectDB"
import Product from "@models/Product"

connectDB()

const handler = async (req, res) => {
	const { method } = req

	if (method === "GET") {
		try {
			const products = await Product.find()

			return res.status(201).json(products)
		} catch (err) {
			res.status(500).json({
				error: err,
			})
		}
	}
}

export default handler
