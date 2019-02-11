import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			token
		}
	}
`

// TODO: Find a better name for component.
const SigninBox = ({ client }) => {
	let username, password

	return (
		<Mutation
			mutation={LOGIN}
			onCompleted={data => {
				// Store the token in cookie
				document.cookie = cookie.serialize('token', data.login.token, {
					maxAge: 5 * 7 * 24 * 60 * 60 // 5 weeks
				})
				// Force a reload of all the current queries now that the user is
				// logged in
				client.cache.reset().then(() => {
					redirect({}, '/')
				})
			}}
			onError={error => {
				// If you want to send error to external service?
				console.log(error)
			}}
		>
			{(login, { data, error }) => (
				<form
					onSubmit={e => {
						e.preventDefault()
						e.stopPropagation()

						login({
							variables: {
								username: username.value.toLowerCase(),
								password: password.value
							}
						})

						username.value = password.value = ''
					}}
				>
					{error && <p>No user found with that information.</p>}
					<input
						name="username"
						placeholder="Username"
						ref={node => {
							username = node
						}}
					/>
					<br />
					<input
						name="password"
						placeholder="Password"
						ref={node => {
							password = node
						}}
						type="password"
					/>
					<br />
					<button>Sign in</button>
				</form>
			)}
		</Mutation>
	)
}

export default withApollo(SigninBox)
