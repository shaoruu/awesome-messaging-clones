import gql from 'graphql-tag'

export const USER_SUBSCRIPTIONS = gql`
	subscription UserSubscriptions {
		userSubscriptions {
			mutationType
			user {
				# TODO: add more query returned data field
				username
			}
		}
	}
`

export const MESSAGE_SUBSCRIPTIONS = gql`
	subscription MessageSubscriptions($chatroomId: String!) {
		messageSubscriptions(chatroomId: $chatroomId) {
			mutationType
			message {
				# TODO: add more query returned data field
				message
			}
		}
	}
`

export const CHATROOM_SUBSCRIPTIONS = gql`
	subscription ChatroomSubscriptions {
		chatroomSubscriptions {
			mutationType
			chatroom {
				# TODO: add more query returned data field
				name
			}
		}
	}
`
