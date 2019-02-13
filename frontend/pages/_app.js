import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'

import { withApollo } from '../lib/graphql'

class MainApp extends App {
	renderHead() {
		return (
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
				/>
			</Head>
		)
	}

	render() {
		const { Component, pageProps, apolloClient } = this.props
		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					{this.renderHead()}
					<CssBaseline />
					<Component {...pageProps} />
				</ApolloProvider>
			</Container>
		)
	}
}

export default withApollo(MainApp)
