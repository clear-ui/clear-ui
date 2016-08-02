import React from 'react'

import DocPage from '../../docPage'
import Example from '../../example'

import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

export default class GettingStartedPage extends React.Component {
	render() {
		return <DocPage>
			<h1>Get Started</h1>

			<h2>Install</h2>

			{`
			Clear UI is available on the npm.

			Clear UI is split to several modules 

			Installing specific library first requires installing following dependencies:
			`}

			<Example>
				<Example.Code>{`
					npm install jquery
					npm install react
					npm install react-dom
					npm install clear-ui-base

					npm install clear-ui-web
				`}</Example.Code>
			</Example>

			{`
			Also, each library may have additional installation
			instructions that can be found in its 'About' section.

			Then you can use library with some module loader, such as 
			[webpack](https://webpack.github.io/) or
			[browserify](http://browserify.org/).
			`}

			<Example>
				<Example.Code>{`
					import Button from 'clear-ui-web/lib/button'

					class MyApp extends React.Component {
						render() {
							return <div>
								<Button>Hello!</Button>
							</div>
						}
					}
				`}</Example.Code>
			</Example>

			<h3>Precompiled version</h3>

			{`
			Another option is to download one of the precompiled bundles
			that can be used just by adding a \`<script>\` element on the page:

			- [clear-ui-web.min.js](#)
			- [clear-ui-material.min.js](#)
			- [clear-ui-ios.min.js](#)

			Usage:

			TODO where to find mapping
			`}

			<Example>
				<Example.Code>{`
					var Button = ClearUIWeb.Button
				`}</Example.Code>
			</Example>


			<h3>Build</h3>

			{`
			Building Clear UI from source

			clone git repository

			go to lib directory

			run npm install
			then run npm build or npm compile

			read more about building in 
			[clear-ui-scripts](https://github.com/clear-ui/clear-ui/tree/master/scripts)
			`}
			
			<Example>
				<Example.Code>{`
					git clone https://github.com/clear-ui/clear-ui.git
					cd clear-ui-web
					npm install
					npm build
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}





