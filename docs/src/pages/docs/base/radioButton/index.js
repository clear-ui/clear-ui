import React from 'react'

import DocPage from '../../../../docPage'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let radioButtonPropsDoc = baseDocs['radioButtons/radioButton.js'].props
let radioGroupPropsDoc = baseDocs['radioButtons/radioGroup.js'].props

export default class BaseRadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Radio Button</h1>

			{`
			RadioButton and RadioGroup are components that allow the user to choose one of
			a predefined set of options.
			`}

			<h2>RadioGroup Props</h2>

			<PropsDoc doc={radioGroupPropsDoc}/>

			<h2>RadioButton Props</h2>

			<PropsDoc doc={radioButtonPropsDoc}/>
		</DocPage>
	}
}
