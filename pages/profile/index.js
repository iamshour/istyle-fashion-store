import Router from "next/router"
import { useEffect } from "react"
import { BiLogOut, BiLogIn } from "react-icons/bi"

const Profile = () => {
	let user = !null

	useEffect(() => {
		!user && Router.push("/")
	}, [user])

	return (
		<div>
			<div className='cont'>PROFILE_PAGE PROFILE_PAGE</div>
		</div>
	)
}

export default Profile
