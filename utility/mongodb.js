import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URL
const environment = process.env.NODE_ENV

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

let client
let clientPromise

if (!uri) {
	throw new Error("Please add your Mongo URI to .env.local")
}

if (environment === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
