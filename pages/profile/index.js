import Router from "next/router"
import { useEffect } from "react"
import { BiLogOut, BiLogIn } from "react-icons/bi"
import { getSession, signOut } from "next-auth/react"

export default function Profile({ session }) {
	useEffect(() => {
		if (!session) return Router.push("/auth")
	}, [session])

	return (
		<div>
			<div className='cont'>
				<img src={session?.user?.image} style={{ width: "200px", height: "200px" }} />
				<h1>{session?.user?.name}</h1>
				<button className='btn btn-large' onClick={() => signOut()}>
					SIGN OUT
				</button>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)

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
		},
	}
}
