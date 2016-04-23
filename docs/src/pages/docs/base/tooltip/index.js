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
			Base tooltip component.
			`}

			<h2>Props</h2>

			<PropsDoc doc={tooltipPropsDoc}/>
		</DocPage>
	}
}
