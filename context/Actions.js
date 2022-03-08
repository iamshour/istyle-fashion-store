import {
	ADD_TO_CART,
	ADD_TO_FAVORITES,
	NOTIFY,
	REMOVE_FROM_CART,
	REMOVE_FROM_FAVORITES,
} from "./types"

export const addToCart = (productId, outOfStock, cart) => {
	if (outOfStock)
		return {
			type: NOTIFY,
			payload: { error: "Product is currently out of stock" },
		}

	return {
		type: cart.includes(productId) ? REMOVE_FROM_CART : ADD_TO_CART,
		payload: productId,
	}
}

export const addToFavorites = (productId, favorites) => {
	return {
		type: favorites.includes(productId) ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES,
		payload: productId,
	}
}
