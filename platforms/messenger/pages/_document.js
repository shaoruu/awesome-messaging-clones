import React from 'react'
import PropTypes from 'prop-types'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

class MainDocument extends Document {
	render() {
		return (
			<html lang="en" dir="ltr" style={{ height: '100%' }}>
				<Head>
					<meta charSet="utf-8" />
					{/* Use minimum-scale=1 to enable GPU rasterization */}
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
					<style>
						{`
                            * { margin: 0; padding: 0; box-sizing: border-box }
                            #__next { height: 100% }
                        `}
					</style>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Bitter"
						rel="stylesheet"
					/>
					<link
						rel="icon"
						href="https://static.xx.fbcdn.net/rsrc.php/y7/r/O6n_HQxozp9.ico"
					/>
				</Head>
				<body
					style={{
						height: '100%',
						fontFamily:
							'Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;'
					}}>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}

MainDocument.getInitialProps = ctx => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	let pageContext
	const page = ctx.renderPage(Component => {
		const WrappedComponent = props => {
			pageContext = props.pageContext
			return <Component {...props} />
		}

		WrappedComponent.propTypes = {
			pageContext: PropTypes.object.isRequired
		}

		return WrappedComponent
	})

	let css
	// It might be undefined, e.g. after an error.
	if (pageContext) {
		css = pageContext.sheetsRegistry.toString()
	}

	return {
		...page,
		pageContext,
		styles: (
			<>
				<style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
				{flush() || null}
			</>
		)
	}
}

export default MainDocument
