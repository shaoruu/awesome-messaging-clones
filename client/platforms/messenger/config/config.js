import { createMuiTheme } from '@material-ui/core'

/**
 * GraphQL configuration
 */
export const GQL_BACKEND_URI = domain => `http://${domain}:8000/graphql/`
export const GQL_WS_URI = domain => `ws://${domain}:8000/subscriptions/`

/**
 * Material-UI
 */
export const THEME = createMuiTheme({
	typography: {
		useNextVariants: true
	}
})
