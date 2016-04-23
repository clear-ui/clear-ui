import React from 'react'

import DocPage from '../../../../docPage'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let checkboxPropsDoc = baseDocs['checkbox/index.js'].props

export default class BaseCheckboxButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Checkbox</h1>

			{`
			Checkbox is a component that allows the user to toggle checked/unchecked
			state of a single option.
			`}

			<h2>Props</h2>

			<PropsDoc doc={checkboxPropsDoc}/>
		</DocPage>
	}
}
