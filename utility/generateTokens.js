import jwt from "jsonwebtoken"

export const createAccessToken = (token) => {
	return jwt.sign(token, process.env.JWT_SECRET, { expiresIn: "15m" })
}
