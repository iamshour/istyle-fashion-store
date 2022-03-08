import { useContext, useEffect, useRef } from "react"
import { DataContext } from "@context/GlobalContext"
import Loading from "@comps/fragments/Loading"
import { NOTIFY } from "@context/types"

const Notify = ({ urlLoading }) => {
	const [{ notify }, dispatch] = useContext(DataContext)
	const toastRef = useRef()

	useEffect(() => {
		if (notify?.error || notify?.success) {
			setTimeout(() => {
				toastRef.current.style.animationName = "slidingOut"
			}, 3000)

			setTimeout(() => {
				dispatch({
					type: NOTIFY,
					payload: {},
				})
			}, 4000)
		}

		return () => {
			toastRef?.current?.classList?.remove("toast-disappear")
		}
	}, [notify?.error, notify?.success])

	return (
		<>
			{notify?.loading || urlLoading ? (
				<Loading />
			) : notify?.error || notify?.success ? (
				<div
					className={`notify-container ${
						notify?.error ? "notify-error" : "notify-success"
					}`}>
					<div className='wrapper' ref={toastRef}>
						<h4>{notify?.error ? "Error" : "Success!"}</h4>
						<p>{notify?.error ? notify?.error : notify?.success}</p>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Notify
