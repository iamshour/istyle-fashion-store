import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: [true, "Please add's product name"],
		},
		price: {
			type: Number,
			required: true,
			trim: [true, "Please add product's price"],
		},
		description: {
			type: String,
			required: [true, "Please add product's description"],
		},
		images: {
			type: Array,
			required: true,
			min: [1, "Please add at least one product image"],
			max: 6,
		},
		category: {
			type: String,
			required: [true, "Please add product's category"],
		},
		checked: {
			type: Boolean,
			default: false,
		},
		inStock: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		size: {
			type: [String],
			required: [true, "Please insert available product sizes"],
		},
	},
	{
		timestamps: true,
	}
)

const Dataset = mongoose.models.products || mongoose.model("products", productSchema)

export default Dataset
