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
			Base tooltip component that can be shown next to an element on
			tap, hover, focus or combination of these events.

			This component requires instance of [ZContext](#/docs/base/zcontext) to
			be rendered on the page.
			`}

			<h2>API</h2>

			<h3>Props</h3>

			<PropsDoc doc={tooltipPropsDoc}/>
		</DocPage>
	}
}
