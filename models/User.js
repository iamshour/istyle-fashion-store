import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				"https://res.cloudinary.com/dniaqkd0y/image/upload/v1639408597/blank-profile-picture-973460_640_caalj3.png",
		},
		role: {
			type: String,
			default: "user",
		},
		root: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

const Dataset = mongoose.models.user || mongoose.model("user", userSchema)

export default Dataset
