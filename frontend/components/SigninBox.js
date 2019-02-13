import { Mutation, withApollo } from 'react-apollo'

import { setCookie } from '../lib/utils'
import { LOGIN_MUTATION } from '../lib/graphql'
import { redirect } from '../lib/utils'

// TODO: Find a better name for component.
const SigninBox = ({ client }) => {
	let username, password

	return (
		<Mutation
			mutation={LOGIN_MUTATION}
			onCompleted={data => {
				setCookie(data.login.token)

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
