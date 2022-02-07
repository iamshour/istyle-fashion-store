import { createContext, useEffect, useReducer } from "react"
import { ADD_TO_CART, ADD_TO_FAVORITES } from "./Actions"
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

		if (localFavorites) {
			localFavorites.map((productId) => {
				return dispatch({
					type: ADD_TO_FAVORITES,
					payload: productId,
				})
			})
		}

		if (localCart) {
			localCart.map((productId) => {
				return dispatch({
					type: ADD_TO_CART,
					payload: productId,
				})
			})
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(state.favorites))
	}, [state.favorites])

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart))
	}, [state.cart])

	return <DataContext.Provider value={[state, dispatch]}>{children}</DataContext.Provider>
}
