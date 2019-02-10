import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { getMainDefinition } from 'apollo-utilities'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
	global.fetch = fetch
}

function create(initialState, { getToken }) {
	const httpLink = createHttpLink({
		uri: 'http://localhost:8000/graphql/'
		// credentials: 'same-origin'
	})

	const wsLink = process.browser
		? new WebSocketLink({
				uri: `ws://localhost:8000/subscriptions/`,
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

	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	return new ApolloClient({
		// connectToDevTools: process.browser,
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
