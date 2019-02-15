import { Component } from 'react'
import { signout, redirect } from '../lib/utils'
import { ApolloConsumer } from 'react-apollo'

class Logout extends Component {
	render() {
		return (
			<ApolloConsumer>
				{client => {
					if (process.browser) {
						console.log(client)
						signout(client)
						redirect({}, '/login')
					}
					return null
				}}
			</ApolloConsumer>
		)
	}
}

export default Logout
