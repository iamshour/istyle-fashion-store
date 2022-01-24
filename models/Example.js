import mongoose from "mongoose"

const exampleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Dataset = mongoose.models.example || mongoose.model("example", exampleSchema)

export default Dataset
