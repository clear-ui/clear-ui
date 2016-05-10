
import React from 'react'

import DocPage from '../../../../docPage'

export default class AboutMaterial extends React.Component {
	render() {
		return <DocPage>
			<h1>Clear UI Material</h1>

			{`
			Clear UI Material is a set of components that implement Goolge Material Design.
			Implementation is based on the
			[official specification](https://www.google.com/design/spec/material-design/introduction.html#)
			provided by Google.
			`}

			<h2>Roboto font</h2>

			{`
			Material components are designed to use with Roboto Font.
			You should include this font in your project.
			Here are
			[some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500)
			 on how to do so.
			`}
		</DocPage>
	}
}





