import { NOTIFY } from "./Actions"

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case NOTIFY:
			return {
				...state,
				notify: payload,
			}
			break

		default:
			return state
	}
}
