import mongoose from "mongoose"

const url = process.env.MONGODB_URL

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.log("DB already connected")
		return
	}
	return mongoose.connect(url, options, (err) => {
		if (err) throw new Error("Some error occured. Please refresh the page.")
		console.log("Connected to the DB!")
	})
}

export default connectDB
