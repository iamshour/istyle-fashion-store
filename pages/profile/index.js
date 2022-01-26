import { BiLogOut, BiLogIn } from "react-icons/bi"
import { getSession, signOut } from "next-auth/react"

export default function Profile({ session, result }) {
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
