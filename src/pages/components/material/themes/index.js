import React from 'react'

import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import Menu from 'clear-ui-material/lib/menu'
import MenuItem from 'clear-ui-material/lib/menu/item'
import Paper from 'clear-ui-material/lib/paper'

import darkTheme from 'clear-ui-material/lib/styles/darkTheme'
import COLORS from 'clear-ui-material/lib/styles/colors'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

class Theme extends React.Component {
	static childContextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	getChildContext() {
		return {clearUiMaterialTheme: this.props.theme}
	}

	render() {
		return <div>{this.props.children}</div>
	}
}

export default class ThemesDoc extends React.Component {
	render() {
		let themeDemo = (
			<Paper>
				<Menu value='2'>
					<MenuItem value='1'>Menu item</MenuItem>
					<MenuItem value='2'>Selected item</MenuItem>
					<MenuItem value='3' disabled={true}>Disabled item</MenuItem>
				</Menu>
				<RaisedButton>Button</RaisedButton>
				{' '}
				<FlatButton>Button</FlatButton>
				<br/>
				<RaisedButton primary={true}>Primary</RaisedButton>
				{' '}
				<FlatButton primary={true}>Primary</FlatButton>
				<br/>
				<RaisedButton accent={true}>Accent</RaisedButton>
				{' '}
				<FlatButton accent={true}>Accent</FlatButton>
			</Paper>
		)

		let myTheme = {
			primary: COLORS.indigo500,
			accent: COLORS.amberA400
		}

		return <DocPage>
			<h1>Material/Themes</h1>

			Clear UI Material supports themes.

			To change the theme, you need to set context prop `clearUiMaterialTheme`
			in the parent component.
			Then children components will use values from the specified theme.

			<Example>
				<Example.Code lang='js'>{`
					import myTheme from './myTheme'

					class MyApp extends React.Component {
						static childContextTypes = {
							clearUiMaterialTheme: React.PropTypes.object
						}

						getChildContext() {
							return {clearUiMaterialTheme: this.props.myTheme}
						}

						// ...
					}
				`}</Example.Code>
			</Example>

			{`
			Clear UI Material ships two themes: dark and light.
			They are located in the directory
			\`clear-ui-material/lib/themes\`.
			`}

			<h2>Light theme (default)</h2>

			<Example>
				<Example.Demo>
					{themeDemo}
				</Example.Demo>
			</Example>

			<h2>Dark theme</h2>

			<Example>
				<Example.Demo>
					<Theme theme={darkTheme}>
						{themeDemo}
					</Theme>
				</Example.Demo>
			</Example>

			<h2>Custom theme</h2>

			{`
			You can define your own themes.
			To do this, you need to create an object with all or some of values of theme fields.
			Missing values will be taken from the default theme. // TODO current

			For example, you can change primary and accent сolors:
			`}

			<Example>
				<Example.Code>{`
					import COLORS from 'clear-ui-material/lib/styles/colors'
					import lightTheme from 'clear-ui-material/lib/styles/lightTheme'

					let myTheme = {
						...lightTheme,
						primary: COLORS.indigo500,
						accent: COLORS.amberA400
					}
				`}</Example.Code>
				<Example.Demo>
					<Theme theme={myTheme}>
						{themeDemo}
					</Theme>
				</Example.Demo>
			</Example>

		</DocPage>
	}
}

