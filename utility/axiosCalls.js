import axios from "axios"

// const instance = axios.create({ baseURL: process.env.BASE_URL })

// instance.interceptors.request.use((req) => {
// 	if (localStorage.getItem("userId")) {
// 		req.headers.authorization = `Bearer ${
// 			JSON.parse(localStorage.getItem("userId"))?.token
// 		}`
// 	}

// 	return req
// })

const link = process.env.NEXT_PUBLIC_BASE_URL

export const getData = async (url) => {
	return await axios.get(`${link}/api/${url}`)
}

export const postData = async (url, data) => {
	return await axios.post(`${link}/api/${url}`, data)
}
