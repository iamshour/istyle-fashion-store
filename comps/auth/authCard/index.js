import { useRef, useState } from "react"
import { signIn } from "next-auth/react"
import { emailValidate } from "@utility/validation"
import AuthBtn from "./children/AuthBtn"
import { NOTIFY } from "@context/types"
import axios from "axios"
//ICONS
import { HiOutlineMail } from "react-icons/hi"

export default function AuthCard({ providers, dispatch }) {
	let emailInput = useRef("")
	const [showSignIn, setShowSignIn] = useState(true)

	const formClassName = !showSignIn ? "signup-form" : ""

	const handleSubmit = async (e) => {
		dispatch({
			type: NOTIFY,
			payload: { loading: true },
		})
		e.preventDefault()

		let email = emailInput.current.value.trim()
		const provider = providers.email
		const errorMessage = emailValidate(email)

		if (errorMessage)
			return dispatch({
				type: NOTIFY,
				payload: { loading: false, error: errorMessage },
			})

		try {
			if (showSignIn) {
				await axios.post("api/finduser/onsignin", { email })
				await signIn(provider.id, { redirect: false, email })
				dispatch({
					type: NOTIFY,
					payload: {
						loading: false,
						success: "Check your email inbox for verification!",
					},
				})
			} else {
				await axios.post("api/finduser/onsignup", { email })
				await signIn(provider.id, { redirect: false, email })
				dispatch({
					type: NOTIFY,
					payload: {
						loading: false,
						success: "Check your email inbox for verification!",
					},
				})
			}
		} catch (error) {
			return dispatch({
				type: NOTIFY,
				payload: {
					loading: false,
					error: error?.response?.data?.msg || "An error occured. please try again.",
				},
			})
		}

		emailInput.current.value = ""
	}

	return (
		<div className='auth-card'>
			<form onSubmit={handleSubmit} className={formClassName}>
				<div className='top'>
					<h4>{showSignIn ? "Sign In" : "Create an account"}</h4>
					<div className='top-action'>
						<h2>{showSignIn ? "Don't" : "Already"} have an account?</h2>
						<button onClick={() => setShowSignIn((prev) => !prev)} type='button'>
							<p>{showSignIn ? "Sign up" : "Sign in"}</p>
						</button>
					</div>
				</div>
				<div className='input-bar-icon'>
					<HiOutlineMail className='icon' />
					<input
						type='text'
						placeholder='Enter your email'
						ref={emailInput}
						spellCheck={false}
					/>
				</div>
				<button type='submit' className='btn email-btn'>
					Continue
				</button>
				<h5>
					We&apos;ll email you a magic code for a password-free{" "}
					{showSignIn ? "Sign in" : "Sign up"}!
				</h5>
			</form>
			<div className='social-auth-btns'>
				<h4>OR</h4>
				{Object?.values(providers)
					?.filter((i) => i.name !== "Email")
					?.map((provider) => (
						<AuthBtn key={provider?.name} provider={provider} />
					))}
			</div>
		</div>
	)
}
