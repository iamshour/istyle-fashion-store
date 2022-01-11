import { AiOutlineUser } from "react-icons/ai"

const auth = () => {
	return (
		<div className='auth-page'>
			<div className='wrapper'>
				<form>
					<div className='input-bar-icon'>
						<AiOutlineUser className='icon' />
						<input type='text' placeholder='add your email' />
					</div>
					<div className='input-bar'>
						<input type='text' placeholder='add your email' />
					</div>
					<button type='submit'>Sign in</button>
				</form>
			</div>
		</div>
	)
}

export default auth
