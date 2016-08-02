import React from 'react'

import Checkbox from 'clear-ui-material/lib/checkbox'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import Example from '../../../../example'

import CheckboxExample from './example.js'
import checkboxExampleCode from '!raw!./example.js'

export default class CheckboxDoc extends React.Component {
	render() {
		return <DocPage>
			<h1 key='h1'>Material<DocPage.ArrowIcon/>Checkbox</h1>

			{`
			Checkbox is a component that allows the user to toggle
			checked/unchecked state of a single option.

			[Checkbox specification](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-checkbox)
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<CheckboxExample/>
				</Example.Demo>
				<Example.Code lang='js'>
					{checkboxExampleCode}
				</Example.Code>
			</Example>

			<h2>API</h2>

			{`
			Extends <a href='#/docs/base/checkbox'>Base > Checkbox</a>
			`}

		</DocPage>
	}
}
