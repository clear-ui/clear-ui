import React from 'react'

import DocPage from '../../docPage'
import Example from '../../example'

import RaisedButton from 'clear-ui-simple/lib/button/raisedButton'

export default class GetStartedPage extends React.Component {
	render() {
		return <DocPage>
			<h1>Get Started</h1>

			<h2>Install</h2>

			{`
			o

				npm install clear-ui-base

				npm install clear-ui-web
				npm install clear-ui-ios
				npm install clear-ui-material
			`}

			<h3>Build</h3>

			{`
			...
			`}
		</DocPage>
	}
}





