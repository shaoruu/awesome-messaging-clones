import gql from 'graphql-tag'

export const ME_QUERY = gql`
	query Me {
		me {
			username
			token
		}
	}
`

export const USER_QUERY = gql`
	query User($username: String!) {
		user(username: $username) {
			# TODO: add more query returned data field
			firstName
			lastName
			email
			isStaff
		}
	}
`

export const USERS_QUERY = gql`
	query Users(
		$before: String
		$after: String
		$first: Int
		$last: Int
		$username_Icontains: String
		$username_Istartswith: String
	) {
		users(
			before: $before
			after: $after
			first: $first
			last: $last
			username_Icontains: $username_Icontains
			username_Istartswith: $username_Istartswith
		) {
			edges {
				node {
					# TODO: add more query returned data field
					firstName
					lastName
					email
					isStaff
				}
			}
		}
	}
`

export const MESSAGE_QUERY = gql`
	query Message($uniqueIdentifier: String!) {
		message(uniqueIdentifier: $uniqueIdentifier) {
			# TODO: add more query returned data field
			message
		}
	}
`

export const MESSAGES_QUERY = gql`
	query Messages(
		$before: String
		$after: String
		$first: Int
		$last: Int
		$message_Icontains: String
		$user_Username: String
		$user_Username_Icontains: String
		$user_Username_Istartswith: String
		$chatroom_Name: String
		$chatroom_Name_Icontains: String
		$chatroom_Name_Istartswith: String
		$chatroom_UniqueIdentifier: String
	) {
		messages(
			before: $before
			after: $after
			first: $first
			last: $last
			message_Icontains: $message_Icontains
			sender_User_Username: $user_Username
			sender_User_Username_Icontains: $user_Username_Icontains
			sender_User_Username_Istartswith: $user_Username_Istartswith
			chatroom_Name: $chatroom_Name
			chatroom_Name_Icontains: $chatroom_Name_Icontains
			chatroom_Name_Istartswith: $chatroom_Name_Istartswith
			chatroom_UniqueIdentifier: $chatroom_UniqueIdentifier
		) {
			edges {
				node {
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
	}
`

export const CHATROOM_QUERY = gql`
	query Chatroom($uniqueIdentifier: String!) {
		chatroom(uniqueIdentifier: $uniqueIdentifier) {
			# TODO: add more query returned data field
			name
		}
	}
`

export const CHATROOMS_QUERY = gql`
	query Chatrooms(
		$before: String
		$after: String
		$first: Int
		$last: Int
		$name: String
		$name_Icontains: String
		$name_Istartswith: String
	) {
		chatrooms(
			before: $before
			after: $after
			first: $first
			last: $last
			name: $name
			name_Icontains: $name_Icontains
			name_Istartswith: $name_Istartswith
		) {
			edges {
				node {
					# TODO: add more query returned data field
					name
				}
			}
		}
	}
`

export const CHATROOM_MEMBERSHIP_QUERY = gql`
	query ChatroomMembership($uniqueIdentifier: String!) {
		chatroomMembership(uniqueIdentifier: $uniqueIdentifier) {
			# TODO: add more query returned data field
			chatroom {
				name
			}
		}
	}
`

export const CHATROOM_MEMBERSHIPS_QUERY = gql`
	query ChatroomMemberships(
		$before: String
		$after: String
		$first: Int
		$last: Int
		$user_Username: String
		$user_Username_Icontains: String
		$user_Username_Istartswith: String
		$chatroom_Name: String
		$chatroom_Name_Icontains: String
		$chatroom_Name_Istartswith: String
		$messagesBefore: String
		$messagesAfter: String
		$messagesFirst: Int
		$messagesLast: Int
	) {
		chatroomMemberships(
			before: $before
			after: $after
			first: $first
			last: $last
			user_Username: $user_Username
			user_Username_Icontains: $user_Username_Icontains
			user_Username_Istartswith: $user_Username_Istartswith
			chatroom_Name: $chatroom_Name
			chatroom_Name_Icontains: $chatroom_Name_Icontains
			chatroom_Name_Istartswith: $chatroom_Name_Istartswith
		) {
			edges {
				node {
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
	}
`
