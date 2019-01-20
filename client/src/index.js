import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import App from './components/App'

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`

const theme = {
    dotSize: '20px',
    hoverColor: '#e6f7ff',
    selectedColor: '#00adff',
    cellDefaultColor: '#fff',
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Fragment>
            <GlobalStyle />
            <App />
        </Fragment>
    </ThemeProvider>,
    document.getElementById('root'),
)
