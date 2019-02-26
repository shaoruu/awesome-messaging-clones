import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { CREATE_CHATROOM_MUTATION } from '../../../../../lib/graphql'
import { redirect } from '../../../../../lib/utils'

export default class Chatrooms extends Component {
	handleCreation = (_, createChatroom) => {
		createChatroom({
			variables: {
				name: 'New Chatroom'
			}
		})
	}
	render() {
		return (
			<Mutation
				mutation={CREATE_CHATROOM_MUTATION}
				onCompleted={data => {
					const {
						createChatroom: {
							chatroom: { uniqueIdentifier }
						}
					} = data
					redirect({}, `/chat/${uniqueIdentifier}`)
				}}>
				{(createChatroom, { error, data }) => {
					return (
						<button onClick={e => this.handleCreation(e, createChatroom)}>
							write
						</button>
					)
				}}
			</Mutation>
		)
	}
}
