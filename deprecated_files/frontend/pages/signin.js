import React from 'react'
import Link from 'next/link'

import { redirect, checkLoggedIn } from '../lib/utils'

import SigninBox from '../components/SigninBox'

export default class Signin extends React.Component {
	static async getInitialProps(context) {
		const { me } = await checkLoggedIn(context.apolloClient)

		if (me.user) {
			// Already signed in? No need to continue.
			// Throw them back to the main page
			redirect(context, '/')
		}

		return {}
	}

	render() {
		return (
			<React.Fragment>
				{/* SigninBox handles all login logic. */}
				<SigninBox />
				<hr />
				New?{' '}
				<Link prefetch href="/create-account">
					<a>Create account</a>
				</Link>
			</React.Fragment>
		)
	}
}
