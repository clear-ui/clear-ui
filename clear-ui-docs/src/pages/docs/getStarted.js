import React from 'react'

import DocPage from '../../docPage'
import Example from '../../example'

import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

export default class GetStartedPage extends React.Component {
	render() {
		return <DocPage>
			<h1>Get Started</h1>

			<h2>Install</h2>

			{`
			Clear UI can be installed from the \`npm\`.

			\`clear-ui-base\` should always be installed,
			it is a dependency for all other Clear UI modules.
			Then you can install additional libraries that you are going to use.
			`}

			<Example>
				<Example.Code>{`
					npm install clear-ui-base

					npm install clear-ui-web
					npm install clear-ui-ios
					npm install clear-ui-material
				`}</Example.Code>
			</Example>

			{`Also you need to manually install some peer dependencies:`}

			<Example>
				<Example.Code>{`
					npm install react
					npm install react-dom
					npm install jquery
				`}</Example.Code>
			</Example>

			{`
			Then you can use it with different module loaders:
			- webpack
			- browserify
			- node.js (for server rendering)
			`}

			{`Another option is to download precompiled build:`}

		</DocPage>
	}
}





