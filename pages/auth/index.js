import { useState, useContext, useRef, useEffect } from "react"
import { DataContext } from "@context/GlobalContext"
import { NOTIFY } from "@context/Actions"
import { emailValidate } from "@utility/validation"
import { getSession, getProviders, signIn } from "next-auth/react"
//COMPS
import AuthSvg from "@comps/auth/AuthSvg"
import AuthBtn from "@comps/auth/AuthBtn"
//ICONS
import { HiOutlineMail } from "react-icons/hi"
import axios from "axios"
import { useRouter } from "next/router"

export default function Auth({ providers }) {
	const [showSignIn, setShowSignIn] = useState(true)
	const [state, dispatch] = useContext(DataContext)
	let emailInput = useRef("")
	const router = useRouter()
	const queryError = router?.query?.error

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

	useEffect(() => {
		if (queryError) {
			dispatch({
				type: NOTIFY,
				payload: { error: `An error occured related to: ${queryError}` },
			})
			router.replace("/auth", undefined, { shallow: true })
		}
	}, [queryError])

	const formClassName = !showSignIn ? "signup-form" : ""

	return (
		<div className='wrapper'>
			<AuthSvg />
			<div className='form-wrapper'>
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
						<input type='text' placeholder='Enter your email' ref={emailInput} />
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
		</div>
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
