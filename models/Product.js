import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Dataset = mongoose.models.products || mongoose.model("products", productSchema)

export default Dataset
