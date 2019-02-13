import React, { Component } from 'react'
import cookie from 'cookie'
import { ApolloConsumer } from 'react-apollo'

import { redirect, checkLoggedIn } from '../lib/utils'

export default class Index extends Component {
	static async getInitialProps(context) {
		const { me } = await checkLoggedIn(context.apolloClient)

		if (me.username) {
			redirect(context, '/chat')
		}

		return { me }
	}

	render() {
		return (
			<ApolloConsumer>
				{client => (
					<>
						<button>Login</button>
						<button>Register</button>
					</>
				)}
			</ApolloConsumer>
		)
	}
}
