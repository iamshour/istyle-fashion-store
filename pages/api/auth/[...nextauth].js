import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@utility/mongodb"
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { html, text } from "@utility/emailUtils"
import nodemailer from "nodemailer"

export default NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			// profile(profile) {
			// 	console.log(profile)
			// 	return {
			// 		// Return all the profile information you need.
			// 		// The only truly required field is `id`
			// 		// to be able identify the account when added to a database
			// 	}
			// },
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
			async sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from },
			}) {
				const { host } = new URL(url)
				const transport = nodemailer.createTransport(server)
				await transport.sendMail({
					to: email,
					from,
					subject: `Sign in to ${host}`,
					text: text({ url, host }),
					html: html({ url, host, email }),
				})
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth",
		signOut: "/profile",
		error: "/auth",
		verifyRequest: "/auth",
	},
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		async session({ session, token }) {
			session.userId = token.sub
			if (session.user.name === undefined) {
				session.user.name = session.user.email.match(/^.*(?=@)/g)[0]
			}
			if (session.user.image === undefined) {
				session.user.image =
					"https://res.cloudinary.com/dniaqkd0y/image/upload/v1639408597/blank-profile-picture-973460_640_caalj3.png"
			}
			return Promise.resolve(session)
		},
	},
})
