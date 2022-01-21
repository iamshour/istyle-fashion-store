import { useState, useContext } from "react"
import Link from "next/link"
import { DataContext } from "@context/GlobalContext"
import { NOTIFY } from "@context/Actions"
import { postData } from "@utility/axiosCalls"
import { validate } from "@utility/validation"
import { getSession, getProviders } from "next-auth/react"
//COMPS
import GoogleLogo from "@comps/auth/GoogleLogo"
import AuthSvg from "@comps/auth/AuthSvg"
//ICONS
import { AiOutlineUser } from "react-icons/ai"
import { BsShieldLockFill } from "react-icons/bs"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { HiOutlineMail } from "react-icons/hi"
import AuthBtn from "@comps/auth/AuthBtn"

export default function Auth({ session, providers }) {
	console.log({ session, providers })
	const [showPass, setShowPass] = useState(false)
	const [showSignIn, setShowSignIn] = useState(true)
	const [state, dispatch] = useContext(DataContext)

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = {}

		Array.from(e.currentTarget.elements).forEach((field) => {
			if (!field.name) return
			formData[field.name] = field.value
		})
		//using Array.from bc e.currentTarget.elements is immutable

		const errorMessage = validate(
			formData.name,
			formData.email,
			formData.password,
			formData.confirmPassword
		)

		if (errorMessage)
			return dispatch({
				type: NOTIFY,
				payload: { error: errorMessage },
			})

		try {
			dispatch({
				type: NOTIFY,
				payload: { loading: true },
			})
			const { data } = await postData("auth/register", formData)
			dispatch({
				type: NOTIFY,
				payload: { success: data.msg },
			})
		} catch (err) {
			dispatch({
				type: NOTIFY,
				payload: {
					error: err?.response?.data?.msg,
				},
			})
		}
	}

	return (
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
						<div className='input-bars'>
							{!showSignIn && (
								<div className='input-bar-icon'>
									<AiOutlineUser className='icon' />
									<input type='text' placeholder='Enter your full name' name='name' />
								</div>
							)}
							<div className='input-bar-icon'>
								<HiOutlineMail className='icon' />
								<input type='text' placeholder='Enter your email' name='email' />
							</div>
							<div className='input-bar-icon pass-input'>
								<BsShieldLockFill className='icon' />
								<input
									type={showPass ? "text" : "password"}
									placeholder='Enter your password'
									name='password'
								/>
								<button onClick={() => setShowPass((prev) => !prev)} type='button'>
									{showPass ? (
										<VscEyeClosed className='icon eye' />
									) : (
										<VscEye className='icon eye' />
									)}
								</button>
							</div>
							{!showSignIn && (
								<div className='input-bar-icon'>
									<BsShieldLockFill className='icon' />
									<input
										type={showPass ? "text" : "password"}
										placeholder='Confirm your password'
										name='confirmPassword'
									/>
								</div>
							)}
						</div>
						{showSignIn && (
							<Link href={"/forgot"} passHref>
								<h2 className='forgot-pass'>Forgot your password?</h2>
							</Link>
						)}
						<button type='submit' className='btn email-btn'>
							<p>Sign {showSignIn ? "in" : "up"}</p>
						</button>
					</form>
					<div className='social-auth-btns'>
						<h4>OR</h4>
						{Object.values(providers)?.map((provider) => (
							<AuthBtn key={provider?.name} provider={provider} showSignIn={showSignIn} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
			providers: await getProviders(),
		},
	}
}
