import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let buttonPropsDoc = baseDocs['button/index.js'].props
let iconButtonPropsDoc = baseDocs['button/iconButton.js'].props

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Button</h1>

			{`
			Base button component.

			It allows to handle taps and display button states
			consistently across different input methods - touch, mouse or keyboard.
			`}

			<h2>Button Props</h2>

			<PropsDoc doc={buttonPropsDoc}/>

			<h2>IconButton Props</h2>

			<PropsDoc
				doc={iconButtonPropsDoc}
				base={{
					name: 'Base > Button Props',
					url: '#/docs/base/button'
				}}
			/>
		</DocPage>
	}
}
