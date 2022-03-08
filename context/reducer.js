import {
	NOTIFY,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
} from "./types"

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case NOTIFY:
			return {
				...state,
				notify: payload,
			}
			break

		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, payload],
			}
			break

		case REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((id) => id !== payload),
			}
			break

		case ADD_TO_FAVORITES:
			return {
				...state,
				favorites: [...state.favorites, payload],
			}
			break

		case REMOVE_FROM_FAVORITES:
			return {
				...state,
				favorites: state.favorites.filter((id) => id !== payload),
			}

		default:
			return state
	}
}
