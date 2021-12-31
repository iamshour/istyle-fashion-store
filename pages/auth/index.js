import { AiOutlineUser } from "react-icons/ai"

const auth = () => {
	return (
		<div classNameName='auth-page'>
			<div classNameName='input-bar-icon'>
				<AiOutlineUser classNameName='icon' />
				<input type='text' placeholder='add your email' />
			</div>
			<div classNameName='input-bar'>
				<input type='text' placeholder='add your email' />
			</div>
		</div>
	)
}

export default auth
