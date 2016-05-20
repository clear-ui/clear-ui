import React from 'react'

import DocPage from '../../../../docPage'
import PropsDoc from '../../../../propsDoc'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'

import baseDocs from '../../../../../docgen/base.json'
let radioButtonPropsDoc = baseDocs['radioButtons/radioButton.js'].props
let radioGroupPropsDoc = baseDocs['radioButtons/radioGroup.js'].props

export default class RadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Radio Buttons</h1>

			{`
			RadioButton and RadioGroup are components that allow the user to choose one of
			a predefined set of options.
			`}

			<h2>RadioGroup API</h2>

			<h3>Props</h3>
			<PropsDoc doc={radioGroupPropsDoc}/>

			<h2>RadioButton API</h2>

			<h3>Props</h3>
			<PropsDoc doc={radioButtonPropsDoc}/>

			<h3>Methods</h3>
			<ApiDoc>
				<ApiDocRow name='focus()'>{`Sets focus to the radio button.`}</ApiDocRow>
				<ApiDocRow name='blur()'>{`Removes focus from the radio button.`}</ApiDocRow>
			</ApiDoc>

			<h3>Child Components</h3>
			<ApiDoc>
				<ApiDocRow name='switch'>{`
					Instance of the <a href='#/docs/base/switch'>Switch</a>
					component that is used to display state of the radio button.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
