import { useContext } from "react"
import { DataContext } from "@context/GlobalContext"
import Loading from "./Loading"
import { NOTIFY } from "@context/Actions"

const Notify = () => {
	const [{ notify }, dispatch] = useContext(DataContext)

	if (notify?.error || notify?.success)
		setTimeout(() => {
			dispatch({
				type: NOTIFY,
				payload: {},
			})
		}, 2200)

	return (
		<>
			{notify?.loading ? (
				<Loading />
			) : notify?.error || notify?.success ? (
				<div
					className={`notify-container ${
						notify?.error ? "notify-error" : "notify-success"
					}`}>
					<div className='wrapper'>
						<h4>{notify?.error ? "Error" : "Success!"}</h4>
						<p>{notify?.error ? notify?.error : notify?.success}</p>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Notify
