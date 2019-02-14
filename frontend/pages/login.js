import React, { Component } from 'react'

import { checkLoggedIn, redirect } from '../lib/utils'
import { LoginForm } from '../components'

export default class Login extends Component {
	static async getInitialProps(context) {
		const { me } = await checkLoggedIn(context.apolloClient)

		if (me.username) {
			redirect(context, '/chat')
		}

		return {}
	}

	render() {
		return <LoginForm />
	}
}
