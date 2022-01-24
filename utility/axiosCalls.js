import axios from "axios"

const link = process.env.NEXT_PUBLIC_BASE_URL

export const getData = async (url) => {
	return await axios.get(`${link}/api/${url}`)
}

export const postData = async (url, data) => {
	return await axios.post(`${link}/api/${url}`, data)
}
