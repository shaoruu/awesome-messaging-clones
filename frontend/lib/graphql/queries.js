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
	query Users($username_Icontains: String, $username_Istartswith: String) {
		users(
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
		$user_Username: String
		$user_Username_Icontains: String
		$username_Username_Istartswith: String
		$chatroom_Name: String
		$chatroom_Name_Icontains: String
		$chatroom_Name_Istartswith: String
	) {
		messages(
			user_Username: $user_Username
			user_Username_Icontains: $user_Username_Icontains
			username_Username_Istartswith: $username_Username_Istartswith
			chatroom_Name: $chatroom_Name
			chatroom_Name_Icontains: $chatroom_Name_Icontains
			chatroom_Name_Istartswith: $chatroom_Name_Istartswith
		) {
			edges {
				node {
					# TODO: add more query returned data field
					message
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
	query Chatrooms($name: String, $name_Icontains: String, $name_Istartswith: String) {
		chatrooms(
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
