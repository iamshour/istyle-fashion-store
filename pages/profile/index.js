import { BiLogOut, BiLogIn } from "react-icons/bi"
import { getSession, signOut } from "next-auth/react"
import Image from "next/image"

export default function Profile({ session }) {
	return (
		<>
			<div className='cont'>
				<Image
					src={session?.user?.image}
					width={100}
					height={100}
					alt='user profile image, or avi'
					objectFit='cover'
				/>
				<h1>{session?.user?.name}</h1>
				<button className='btn btn-large' onClick={() => signOut()}>
					SIGN OUT
				</button>
			</div>
		</>
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
