import cookie from 'cookie'
import Router from 'next/router'

import { GET_ME_QUERY } from './graphql'

export const setCookie = token => {
	// store the token in cookie
	document.cookie = cookie.serialize('token', token, {
		maxAge: 5 * 7 * 24 * 60 * 60 // 5 weeks
	})
}

export const redirect = (context, target) => {
	if (context.res) {
		// server
		// 303: "See other"
		context.res.writeHead(303, { Location: target })
		context.res.end()
	} else {
		// In the browser, we just pretend like this never even happened ;)
		Router.replace(target)
	}
}

export const checkLoggedIn = apolloClient =>
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
