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
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		EmailProvider({
			server: {
				host: "smtp-relay.sendinblue.com",
				service: "sendinblue",
				port: 587,
				auth: {
					user: process.env.SMTP_KEY,
					pass: process.env.SMTP_PASS,
				},
			},
			from: process.env.SENDER_EMAIL,
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

			const user = session?.user

			if (user?.name === undefined || user?.name === null) {
				user.name = user.email?.match(/^.*(?=@)/g)[0]
			}

			if (user?.image === undefined || user?.image === null) {
				user.image =
					"https://res.cloudinary.com/mooskilee/image/upload/v1643272836/blank-profile-picture-973460_640_caalj3_rb7tte.png"
			}

			return Promise.resolve(session)
		},
	},
})
