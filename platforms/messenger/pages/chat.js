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

		return { chatroomId: id, username: me.username }
	}

	render() {
		return (
			<ChatPage chatroomId={this.props.chatroomId} username={this.props.username} />
		)
	}
}

export default withRouter(Chat)
