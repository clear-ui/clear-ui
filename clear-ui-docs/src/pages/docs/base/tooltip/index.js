import React from 'react'

import DocPage from '../../../../docPage'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let tooltipPropsDoc = baseDocs['tooltip/index.js'].props

export default class BaseTooltipDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Tooltip</h1>

			{`
			Base tooltip component that appears next to an element on
			tap, hover, focus or combination of these events.
			`}

			<DocPage.Note>
				This component requires instance of{' '}
				<a href='#/docs/base/zcontext'>ZContext</a>
				{' '}to be rendered on the page.
			</DocPage.Note>

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={tooltipPropsDoc}/>
		</DocPage>
	}
}
