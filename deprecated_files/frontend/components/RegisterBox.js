import { Mutation, withApollo } from 'react-apollo'

import { redirect } from '../lib/utils'
import { REGISTER_AND_LOGIN_MUTATION } from '../lib/graphql'
import { setCookie } from '../lib/utils'

const RegisterBox = ({ client }) => {
	let username, password

	return (
		<Mutation
			mutation={REGISTER_AND_LOGIN_MUTATION}
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
			{(registerAndLogin, { data, error }) => (
				<form
					onSubmit={e => {
						e.preventDefault()
						e.stopPropagation()

						registerAndLogin({
							variables: {
								username: username.value,
								password: password.value
							}
						})

						username.value = password.value = ''
					}}
				>
					{error && <p>Issue occurred while registering :(</p>}
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
					<button>Register</button>
				</form>
			)}
		</Mutation>
	)
}

export default withApollo(RegisterBox)
