import { createContext, useEffect, useReducer } from "react"
import { ADD_TO_CART, ADD_TO_FAVORITES } from "./types"
import { reducer } from "./reducer"

export const DataContext = createContext()

export const MyContextProvider = ({ children }) => {
	let initialState = {
		notify: {},
		cart: [],
		favorites: [],
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		let localFavorites = JSON.parse(localStorage.getItem("favorites"))
		let localCart = JSON.parse(localStorage.getItem("cart"))

		if (localFavorites && localFavorites?.length > 0) {
			localFavorites.map((productId) => {
				dispatch({
					type: ADD_TO_FAVORITES,
					payload: productId,
				})
			})
		}

		if (localCart && localCart?.length > 0) {
			localCart.map((productId) => {
				dispatch({
					type: ADD_TO_CART,
					payload: productId,
				})
			})
		}
	}, [dispatch])

	useEffect(() => {
		if (state.favorites.length > 0)
			localStorage.setItem("favorites", JSON.stringify(state.favorites))
	}, [state.favorites])

	useEffect(() => {
		if (state.cart.length > 0) localStorage.setItem("cart", JSON.stringify(state.cart))
	}, [state.cart])

	return <DataContext.Provider value={[state, dispatch]}>{children}</DataContext.Provider>
}
