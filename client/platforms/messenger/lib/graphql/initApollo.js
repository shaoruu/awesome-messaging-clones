import fetch from 'isomorphic-unfetch'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'

import { GQL_BACKEND_URI, GQL_WS_URI } from '../../config/config'

let apolloClient = null

// Polyfill fetch() on server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch
}

function create(initialState, { getToken }) {
	const httpLink = createHttpLink({
		uri: GQL_BACKEND_URI(process.browser ? '0.0.0.0' : 'backend')
		// fetchOptions: {
		// 	mode: 'no-cors'
		// }
		// credentials: 'same-origin'
	})

	// Check out https://github.com/apollographql/subscriptions-transport-ws/issues/333 to see why I used process.browser
	const link = process.browser
		? split(
				({ query }) => {
					const { kind, operation } = getMainDefinition(query)
					return kind === 'OperationDefinition' && operation === 'subscription'
				},
				new WebSocketLink({
					uri: GQL_WS_URI('0.0.0.0'),
					options: {
						reconnect: true
					}
				}),
				httpLink
		  )
		: httpLink

	const authLink = setContext((_, { headers }) => {
		const token = getToken()
		return {
			headers: {
				...headers,
				authorization: token ? `JWT ${token}` : ''
			}
		}
	})

	return new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		ssrForceFetchDelay: 100,
		link: authLink.concat(link),
		cache: new InMemoryCache().restore(initialState || {})
	})
}

export default function initApollo(initialState, options) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(initialState, options)
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState, options)
	}

	return apolloClient
}
