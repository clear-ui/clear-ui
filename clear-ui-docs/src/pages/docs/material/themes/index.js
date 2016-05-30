import React from 'react'

import COLORS from 'clear-ui-material/lib/styles/colors'
import ThemeProvider from 'clear-ui-material/lib/themes/themeProvider'
import darkTheme from 'clear-ui-material/lib/themes/darkTheme'
import Components from './components.js'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

import ThemesExample from './example.js'
import themesExampleCode from '!raw!./example.js'

export default class ThemesDoc extends React.Component {
	render() {

		let myTheme = {
			primary: COLORS.teal500,
			accent: COLORS.redA400
		}

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Themes</h1>

			{`
			Clear UI Material supports themes.

			To change the theme, you need to wrap component with \`ThemeProvider\`.
			Then all children components will use values from the specified theme.

			Clear UI Material ships two themes: dark and light.
			They are located in the directory \`clear-ui-material/lib/themes\`.
			`}

			<Example>
				<Example.Demo>
					<ThemesExample/>
				</Example.Demo>
				<Example.Code>
					{themesExampleCode}
				</Example.Code>
			</Example>

			<h2>Custom theme</h2>

			{`
			You can define your own themes.
			To do this, you need to create an object with values of theme fields.
			You can fill missing values from another theme.

			For example, you can change primary and accent сolors:
			`}

			<Example>
				<Example.Code>{`
					import COLORS from 'clear-ui-material/lib/styles/colors'
					import lightTheme from 'clear-ui-material/lib/styles/lightTheme'

					let myTheme = {
						...lightTheme,
						primary: COLORS.teal500,
						accent: COLORS.redA400
					}
				`}</Example.Code>
				<Example.Demo>
					<ThemeProvider theme={myTheme}>
						<Components/>
					</ThemeProvider>
				</Example.Demo>
			</Example>

		</DocPage>
	}
}

