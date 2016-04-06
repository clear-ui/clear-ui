import React from 'react'

import DocPage from '../../../../docPage'
// import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let buttonPropsDoc = baseDocs['button/index.js'].props

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Button</h1>

			{`
			Base button component.

			It allows to handle taps and display button states
			consistently across different input methods - touch, mouse or keyboard.
			`}

			<h2>Props</h2>
			<PropsDoc doc={buttonPropsDoc}/>
		</DocPage>
	}
}
