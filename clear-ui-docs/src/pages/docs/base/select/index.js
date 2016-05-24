import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let selectPropsDoc = baseDocs['select/index.js'].props

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Select</h1>

			{`

			This component requires instance of [ZContext](#/docs/base/zcontext) to
			be rendered on the page.
			`}

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={selectPropsDoc}/>

			<h3>Methods</h3>
			<ApiDoc>
				<ApiDocRow name='focus()'>{`
					Sets focus to the select.
				`}</ApiDocRow>
				<ApiDocRow name='blur()'>{`
					Removes focus from the select.
				`}</ApiDocRow>
				<ApiDocRow name='renderTrigger() => node'>{`
				`}</ApiDocRow>
				<ApiDocRow name='renderTriggerContent() => node'>{`
					Returns content of currently selected element or placeholder text.
				`}</ApiDocRow>
			</ApiDoc>

			<h3>Styleable Elements</h3>
			<ApiDoc>
				<ApiDocRow name='root'>{`Root element.`}</ApiDocRow>
				<ApiDocRow name='label'>{`.`}</ApiDocRow>
				<ApiDocRow name='value'>{`.`}</ApiDocRow>
				<ApiDocRow name='trigger?'>{`.`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
