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
			default:
				"https://res.cloudinary.com/dniaqkd0y/image/upload/v1639408597/blank-profile-picture-973460_640_caalj3.png",
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
