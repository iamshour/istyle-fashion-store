import { useState, useContext, useRef } from "react"
import { DataContext } from "@context/GlobalContext"
import { NOTIFY } from "@context/Actions"
import { emailValidate } from "@utility/validation"
import { getSession, getProviders, signIn } from "next-auth/react"
//COMPS
import AuthSvg from "@comps/auth/AuthSvg"
import AuthBtn from "@comps/auth/AuthBtn"
//ICONS
import { HiOutlineMail } from "react-icons/hi"
import Head from "next/head"
import axios from "axios"

export default function Auth({ providers }) {
	const [showSignIn, setShowSignIn] = useState(true)
	const [state, dispatch] = useContext(DataContext)
	let emailInput = useRef("")

	const handleSubmit = async (e) => {
		dispatch({
			type: NOTIFY,
			payload: { loading: true },
		})
		e.preventDefault()
		let email = emailInput.current.value
		const provider = providers.email

		const errorMessage = emailValidate(email)

		if (errorMessage)
			return dispatch({
				type: NOTIFY,
				payload: { error: errorMessage },
			})

		if (showSignIn) {
			try {
				const { status } = await axios.post("api/finduser/onsignin", { email })
				if (status === 201) {
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
		} else {
			try {
				const { status } = await axios.post("api/finduser/onsignup", { email })
				if (status === 201) {
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
		}

		emailInput.current.value = ""
	}

	return (
		<>
			<Head>
				<title>iStyle Fashion Store | Sign In</title>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<div className='auth-page'>
				<div className='wrapper'>
					<AuthSvg />
					<div className='form-wrapper'>
						<form onSubmit={handleSubmit} className={!showSignIn ? "signup-form" : ""}>
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
								<input type='text' placeholder='Enter your email' ref={emailInput} />
							</div>
							<button type='submit' className='btn email-btn'>
								Continue
							</button>
							<h5>
								We'll email you a magic code for a password-free{" "}
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
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const providers = await getProviders()

	if (session) {
		return {
			redirect: {
				destination: "/profile",
				permanent: false,
			},
		}
	}
	return {
		props: {
			providers,
		},
	}
}
