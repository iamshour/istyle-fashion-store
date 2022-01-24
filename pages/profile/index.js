import { useState } from "react"
import { BiLogOut, BiLogIn } from "react-icons/bi"
import { getSession, signOut } from "next-auth/react"
import { getData, postData } from "@utility/axiosCalls"

export default function Profile({ session, result }) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	})

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handler = async (e) => {
		e.preventDefault()

		const { data } = await postData("example", formData)
		console.log(data)
	}

	return (
		<div>
			<div className='cont'>
				<img src={session?.user?.image} style={{ width: "200px", height: "200px" }} />
				<h1>{session?.user?.name}</h1>
				<button className='btn btn-large' onClick={() => signOut()}>
					SIGN OUT
				</button>
				<form onSubmit={handler}>
					<input type='text' onChange={changeHandler} name='title' />
					<input type='text' onChange={changeHandler} name='description' />
					<button type='submit' className='btn btn-large'>
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const { data } = await getData("example")

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		}
	}
	return {
		props: {
			session,
			result: data,
		},
	}
}
