import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

import RadioButtonsExample from './example.js'
import radioButtonsExampleCode from '!raw!./example.js'

export default class RadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Radio Buttons</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<RadioButtonsExample/>
				</Example.Demo>
				<Example.Code>
					{radioButtonsExampleCode}
				</Example.Code>
			</Example>

			<h2>RadioButton API</h2>

			{`
			Extends <a href='#/docs/base/radio-buttons'>Base > Radio Buttons > RadioButton</a>
			`}

			<h2>RadioGroup API</h2>

			{`
			Extends <a href='#/docs/base/radio-buttons'>Base > Radio Buttons > RadioGroup</a>
			`}
		</DocPage>
	}
}
