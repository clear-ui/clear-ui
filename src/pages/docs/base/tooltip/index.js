import React from 'react'

import DocPage from '../../../../docPage'
// import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

export default class BaseTooltipDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Tooltip</h1>

			{`
			Base tooltip component.
			`}

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row
					name='tooltip'
					type='node'
				>{`
					Content of the tooltip.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='children'
					type='element'
				>{`
					Element that will have the tooltip.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='sides'
					type='array'
					defaultValue={`['top', 'right', 'bottom', 'left']`}
				>{`
					List of sides where tooltip can be shown in the order of priority.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='align'
					type='string'
					defaultValue='center'
				>{`
					Alignment of the tooltip on the element's side.
					<br/>
					Possible values: \`'begin', 'center', 'end'\`
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
