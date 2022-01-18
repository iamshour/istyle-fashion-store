import { AUTH, NOTIFY } from "./Actions"

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case AUTH:
			return {
				...state,
				auth: payload,
			}
			break

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
