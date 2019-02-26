import React, { Component } from 'react'
import cookie from 'cookie'
import { ApolloConsumer, Query } from 'react-apollo'

import { redirect, checkLoggedIn } from '../lib/utils'
import { USERS_QUERY } from '../lib/graphql'

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
					<Query query={USERS_QUERY}>
						{({ loading, data }) => {
							if (loading) return null
							console.log(data)
							return (
								<>
									<button>Login</button>
									<button>Register</button>
								</>
							)
						}}
					</Query>
				)}
			</ApolloConsumer>
		)
	}
}
