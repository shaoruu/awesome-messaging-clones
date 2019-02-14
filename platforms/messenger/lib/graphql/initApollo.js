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
		uri: GQL_BACKEND_URI,
		credentials: 'same-origin'
	})

	// Check out https://github.com/apollographql/subscriptions-transport-ws/issues/333 to see why I used process.browser
	const wsLink = process.browser
		? new WebSocketLink({
				uri: GQL_WS_URI,
				options: {
					reconnect: true
				}
		  })
		: null

	const link = process.browser
		? split(
				({ query }) => {
					const { kind, operation } = getMainDefinition(query)
					return kind === 'OperationDefinition' && operation === 'subscription'
				},
				wsLink,
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
