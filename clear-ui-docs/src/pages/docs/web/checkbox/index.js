import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'
import Example from '../../../../example'

import CheckboxExample from './example.js'
import checkboxExampleCode from '!raw!./example.js'
import ReusableCheckboxExample from './reusableExample.js'

import webDocs from '../../../../../docgen/web.json'
let checkboxPropsDoc = webDocs['checkbox/index.js'].props

export default class CheckboxDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Checkbox</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<CheckboxExample/>
				</Example.Demo>
				<Example.Code>
					{checkboxExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			<Example>
				<Example.Demo>
					<ReusableCheckboxExample height='small'>Small</ReusableCheckboxExample>
					<ReusableCheckboxExample>Default</ReusableCheckboxExample>
					<ReusableCheckboxExample height='big'>Big</ReusableCheckboxExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Checkbox height='small' ...>Small</Checkbox>
					<Checkbox ...>Default</Checkbox>
					<Checkbox height='big' ...>Big</Checkbox>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			{`
			Extends <a href='#/docs/base/checkbox'>Base > Checkbox</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={checkboxPropsDoc}/>
		</DocPage>
	}
}
