import gql from 'graphql-tag'

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

// export const REFRESH_TOKEN_MUTATION = gql`
// 	mutation RefreshToken($token: String!) {
// 		refreshToken(input: { token: $token }) {
// 			token
// 		}
// 	}
// `
