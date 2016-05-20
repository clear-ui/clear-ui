import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
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

			<h2>API</h2>

			<h3>Props</h3>

			<PropsDoc doc={checkboxPropsDoc}/>

			<h3>Child Components</h3>

			<ApiDoc>
				<ApiDocRow name='switch'>{`
					Instance of the <a href='#/docs/base/switch'>Switch</a>
					component that is used to display state of the checkbox.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
