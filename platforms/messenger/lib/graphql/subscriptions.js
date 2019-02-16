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
				uniqueIdentifier
				message
				sender {
					nickname
					user {
						username
					}
				}
			}
		}
	}
`

export const CHATROOM_SUBSCRIPTIONS = gql`
	subscription ChatroomSubscriptions(
		$messagesBefore: String
		$messagesAfter: String
		$messagesFirst: Int
		$messagesLast: Int
	) {
		chatroomSubscriptions {
			mutationType
			chatroom {
				uniqueIdentifier
				name
				messages(
					before: $messagesBefore
					after: $messagesAfter
					first: $messagesFirst
					last: $messagesLast
				) {
					edges {
						node {
							sender {
								nickname
								user {
									username
								}
							}
							message
						}
					}
				}
			}
		}
	}
`

export const CHATROOM_MEMBERSHIP_SUBSCRIPTIONS = gql`
	subscription ChatroomMembershipsSubscriptions(
		$messagesBefore: String
		$messagesAfter: String
		$messagesFirst: Int
		$messagesLast: Int
		$username: String!
	) {
		chatroomMembershipSubscriptions(username: $username) {
			mutationType
			chatroomMembership {
				uniqueIdentifier
				chatroom {
					uniqueIdentifier
					name
					messages(
						before: $messagesBefore
						after: $messagesAfter
						first: $messagesFirst
						last: $messagesLast
					) {
						edges {
							node {
								sender {
									nickname
									user {
										username
									}
								}
								message
							}
						}
					}
				}
			}
		}
	}
`
