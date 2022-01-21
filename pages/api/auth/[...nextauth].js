import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@utility/mongodb"
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	pages: {
		signIn: "/auth",
		signOut: "/profile",
	},
	adapter: MongoDBAdapter(clientPromise),
})
