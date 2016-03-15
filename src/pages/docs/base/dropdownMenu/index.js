import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class DropdownMenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Dropdown Menu</h1>

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row name='value' type='string'>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='onSelect' type='function'>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='width' type='string'>{`
					Width of the dropdown list, in px or % of trigger's width.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='expandSide' type='string' defaultValue='right'>{`
					Horizontal side where list expands when it is wider than trigger element,
					\`'left'\` or \`'right'\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='vertSide' type='string' defaultValue='bottom'>{`
					Vertical side where list shows if there is enough space,
					\`'top'\` or \`'bottom'\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='animation' type='string'>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='maxHeight' type='string'>{`
					TODO
				`}</ApiDoc.Row>

				<ApiDoc.Row name='offset' type='numer'>{`
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
