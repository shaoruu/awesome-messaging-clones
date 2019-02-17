import gql from 'graphql-tag'
import * as Yup from 'yup'

export const LOGIN_MUTATION = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			token
		}
	}
`

export const REGISTER_AND_LOGIN_MUTATION = gql`
	mutation Register($username: String!, $password: String!) {
		register(input: { username: $username, password: $password }) {
			user {
				id
			}
		}
		login(input: { username: $username, password: $password }) {
			token
		}
	}
`

export const CREATE_MESSAGE_MUTATION = gql`
	mutation CreateMessage($chatroomId: String!, $message: String!) {
		createMessage(input: { chatroomId: $chatroomId, message: $message }) {
			message {
				# TODO: add more query returned data field
				message
			}
		}
	}
`

export const CREATE_CHATROOM_MUTATION = gql`
	mutation CreateChatroom($name: String!) {
		createChatroom(input: { name: $name }) {
			chatroom {
				uniqueIdentifier
				# TODO: add more query returned data field
				name
			}
		}
	}
`

export const UPDATE_MESSAGE_MUTATION = gql`
	mutation UpdateMessage($messageId: String!, $message: String!) {
		updateMessage(input: { messageId: $messageId, message: $message }) {
			message {
				# TODO: add more query returned data field
				message
			}
		}
	}
`

export const UPDATE_CHATROOM_MUTATION = gql`
	mutation UpdateChatroom($chatroomId: String!, $name: String!) {
		updateChatroom(input: { chatroomId: $chatroomId, name: $name }) {
			chatroom {
				# TODO: add more query returned data field
				name
			}
		}
	}
`

export const DELETE_MESSAGE_MUTATION = gql`
	mutation DeleteMessage($messageId: String!) {
		deleteMessage(input: { messageId: $messageId }) {
			successful
		}
	}
`

export const DELETE_CHATROOM_MUTATION = gql`
	mutation DeleteChatroom($chatroomId: String!) {
		deleteChatroom(input: { chatroomId: $chatroomId }) {
			successful
		}
	}
`

export const CREATE_CHATROOM_MEMBERSHIP_MUTATION = gql`
	mutation CreateChatroomMembership($username: String!, $chatroomId: String!) {
		createChatroomMembership(
			input: { username: $username, chatroomId: $chatroomId }
		) {
			chatroomMembership {
				uniqueIdentifier
				user {
					username
				}
			}
		}
	}
`

export const DELETE_CHATROOM_MEMBERSHIP_MUTATION = gql`
	mutation DeleteChatroomMembership($username: String!, $chatroomId: String!) {
		deleteChatroomMembership(
			input: { username: $username, chatroomId: $chatroomId }
		) {
			successful
		}
	}
`

/**
 * Validation Schemas
 */
export const LOGIN_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string().required('Password is required.')
})
