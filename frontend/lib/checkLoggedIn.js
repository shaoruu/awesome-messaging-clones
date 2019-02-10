import gql from 'graphql-tag'

export default apolloClient =>
	apolloClient
		.query({
			query: gql`
				query getMe {
					me {
						username
					}
				}
			`
		})
		.then(({ data }) => {
			return data
		})
		.catch(() => {
			// Fail gracefully
			return { me: {} }
		})
