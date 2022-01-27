import connectDB from "@utility/connectDB"
import Product from "@models/Product"

connectDB()

const handler = async (req, res) => {
	if (req.method.startsWith("GET")) {
		try {
			const product = await Product.findById(req.query.id)

			return res.status(201).json(product)
		} catch (err) {
			res.status(500).json({
				error: err,
			})
		}
	}
}

export default handler
