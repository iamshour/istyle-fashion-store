import { FaFacebookF } from "react-icons/fa"
import GoogleLogo from "./GoogleLogo"
import { signIn } from "next-auth/react"

export default function AuthBtn({ provider }) {
	return (
		<button
			className={`auth-btn ${provider.name === "Google" ? "google-btn" : "facebook-btn"}`}
			onClick={() => signIn(provider.id)}
			type='submit'>
			{provider.name === "Google" ? (
				<GoogleLogo />
			) : (
				<div className='fb-icon'>
					<FaFacebookF className='icon' />
				</div>
			)}
			<p>Continue with {provider.name}</p>
		</button>
	)
}
