import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

import RadioButtonsExample from './example.js'
import radioButtonsExampleCode from '!raw!./example.js'

export default class RadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Radio Buttons</h1>

			{`
			Radio buttons allow the user to select one option from a set.

			[Radio buttons specification](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<RadioButtonsExample/>
				</Example.Demo>
				<Example.Code>
					{radioButtonsExampleCode}
				</Example.Code>
			</Example>

			<h2>RadioButton Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/radio-buttons'>Base > Radio Buttons > RadioButton props</a>
				</ApiDoc.Row>
			</ApiDoc>

			<h2>RadioGroup Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/radio-buttons'>Base > Radio Buttons > RadioGroup props</a>
				</ApiDoc.Row>
			</ApiDoc>

		</DocPage>
	}
}
