import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core'

import { getPageContext, signout } from '../lib/utils'
import { withApollo } from '../lib/graphql'

class MainApp extends App {
	constructor() {
		super()
		this.pageContext = getPageContext()
	}

	componentDidMount() {
		// Remove the server-side injected CSS
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles)
		}
	}

	render() {
		const { Component, pageProps, apolloClient } = this.props
		return (
			<Container>
				<Head>
					<title>Awesome Messenger</title>
				</Head>
				{/* Wrap every page in Jss and Theme providers */}
				<JssProvider
					registry={this.pageContext.sheetsRegistry}
					generateClassName={this.pageContext.generateClassName}>
					{/* MuiThemeProvider makes the theme available down the React
                        tree thanks to React context. */}
					<MuiThemeProvider
						theme={this.pageContext.theme}
						sheetsManager={this.pageContext.sheetsManager}>
						<ApolloProvider client={apolloClient}>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							{/* Pass pageContext to the _document though the renderPage enhancer
                                to render collected styles on server-side. */}
							<Component pageContext={this.pageContext} {...pageProps} />
						</ApolloProvider>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		)
	}
}

export default withApollo(MainApp)
