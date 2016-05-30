import React from 'react'
import {RadioGroup, RadioButton} from 'clear-ui-material/lib/radioButtons'
import ThemeProvider from 'clear-ui-material/lib/themes/themeProvider'
import darkTheme from 'clear-ui-material/lib/themes/darkTheme'
import lightTheme from 'clear-ui-material/lib/themes/lightTheme'

import Components from './components.js'

export default class ThemesExample extends React.Component {
	state = {theme: 'light'}

	render() {
		let theme = this.state.theme === 'light' ? lightTheme : darkTheme
		return (
			<div>
				<RadioGroup value={this.state.theme}
					onChange={(value) => { this.setState({theme: value}) }}>
					<RadioButton value='light'>Light</RadioButton>
					<RadioButton value='dark'>Dark</RadioButton>
				</RadioGroup>
				<ThemeProvider theme={theme}>
					<Components/>
				</ThemeProvider>
			</div>
		)
	}
}
