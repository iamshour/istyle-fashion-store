import { FaFacebookF } from "react-icons/fa"
import GoogleLogo from "./GoogleLogo"
import { signIn } from "next-auth/react"

export default function AuthBtn({ provider, showSignIn }) {
	return (
		<button
			className={`auth-btn ${provider.name === "Google" ? "google-btn" : "facebook-btn"}`}
			onClick={() => signIn(provider.id)}
			type='submit'>
			{provider.name === "Google" ? <GoogleLogo /> : <FaFacebookF className='icon' />}
			<p>
				Sign {showSignIn ? "in" : "up"} with {provider.name}
			</p>
		</button>
	)
}
