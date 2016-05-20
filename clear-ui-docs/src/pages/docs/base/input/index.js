import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let inputPropsDoc = baseDocs['input/index.js'].props

export default class InputDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Input</h1>

			{`
			Base text input component.
			`}

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={inputPropsDoc}/>

			<h3>Methods</h3>
			<ApiDoc>
				<ApiDocRow name='focus'>{`
					Sets focus to the input.
				`}</ApiDocRow>
				<ApiDocRow name='focus'>{`
					Removes focus from the input.
				`}</ApiDocRow>
			</ApiDoc>

			<h3>Styleable Elements</h3>
			<ApiDoc>
				<ApiDocRow name='root'>{`
					Root element.
				`}</ApiDocRow>
				<ApiDocRow name='input'>{`
					Input element.
				`}</ApiDocRow>
			</ApiDoc>

		</DocPage>
	}
}

