import React, { Component } from 'react'
import { withRouter } from 'next/router'

import { checkLoggedIn, redirect } from '../lib/utils'
import { ChatPage } from '../components'

class Chat extends Component {
	static async getInitialProps(context) {
		const { me } = await checkLoggedIn(context.apolloClient)

		const {
			query: { id }
		} = context

		if (!me.username) {
			redirect(context, '/login')
		}

		return { chatroomId: id }
	}

	render() {
		if (!this.props.chatroomId) return null
		return <ChatPage chatroomId={this.props.chatroomId} />
	}
}

export default withRouter(Chat)
