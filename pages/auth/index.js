import AuthSvg from "@comps/utility/AuthSvg"
import GoogleLogo from "@comps/utility/GoogleLogo"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { BsShieldLockFill } from "react-icons/bs"
import { VscEye, VscEyeClosed } from "react-icons/vsc"

const Auth = () => {
	const [showPass, setShowPass] = useState(false)
	const [signIn, setSignIn] = useState(true)

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = {}

		Array.from(e.currentTarget.elements).forEach((field) => {
			if (!field.name) return
			formData[field.name] = field.value
		})
		//using Array.from bc e.currentTarget.elements is immutable
		console.log(formData)
	}

	return (
		<div className='auth-page'>
			<div className='wrapper'>
				<AuthSvg />
				<form onSubmit={handleSubmit} className={!signIn ? "signup-form" : ""}>
					<div className='top'>
						<h4>{signIn ? "Sign In" : "Create an account"}</h4>
						<div className='top-action'>
							<h2>{signIn ? "Don't" : "Already"} have an account?</h2>
							<button onClick={() => setSignIn((prev) => !prev)} type='button'>
								<p>{signIn ? "Sign up" : "Sign in"}</p>
							</button>
						</div>
					</div>
					<div className='input-bars'>
						{!signIn && (
							<div className='input-bar'>
								<input type='text' placeholder='First name' name='firstName' />
								<input type='text' placeholder='Last name' name='lastName' />
							</div>
						)}
						<div className='input-bar-icon'>
							<AiOutlineUser className='icon' />
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
						{!signIn && (
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
					{signIn && (
						<Link href={"/forgot"} passHref>
							<h2 className='forgot-pass'>Forgot your password?</h2>
						</Link>
					)}
					<div className='btns'>
						<button type='submit' className='btn'>
							<p>Sign {signIn ? "in" : "up"}</p>
						</button>
						<h4>OR</h4>
						<button type='submit' className='btn-google'>
							<GoogleLogo />
							<p>Sign {signIn ? "in" : "up"} with Google</p>
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth
