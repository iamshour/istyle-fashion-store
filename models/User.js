import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "Guest",
		},
		email: {
			type: String,
		},
		image: {
			type: String,
		},
		emailVerified: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Dataset = mongoose.models.users || mongoose.model("users", userSchema)

export default Dataset
