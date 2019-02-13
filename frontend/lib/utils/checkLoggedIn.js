import { GET_ME_QUERY } from '../graphql'

export default apolloClient =>
	apolloClient
		.query({
			query: GET_ME_QUERY
		})
		.then(({ data }) => {
			return data
		})
		.catch(() => {
			// Fail gracefully
			return { me: {} }
		})
