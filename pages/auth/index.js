import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { DataContext } from "@context/GlobalContext"
import { NOTIFY } from "@context/Actions"
import { getSession, getProviders } from "next-auth/react"
//COMPS
import AuthSvg from "@comps/auth/authSvg"
import AuthCard from "@comps/auth/authCard"

export default function Auth({ providers }) {
	const [state, dispatch] = useContext(DataContext)
	const router = useRouter()
	const queryError = router?.query?.error

	useEffect(() => {
		if (queryError) {
			dispatch({
				type: NOTIFY,
				payload: {
					error: queryError.startsWith("OAuthAccountNotLinked")
						? "Email is used for another authentication provider. Just Try another auth method."
						: `An error occured related to: ${queryError}`,
				},
			})
			router.replace("/auth", undefined, { shallow: true })
		}
	}, [queryError])

	return (
		<div className='wrapper'>
			<AuthSvg />
			<AuthCard providers={providers} dispatch={dispatch} />
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
