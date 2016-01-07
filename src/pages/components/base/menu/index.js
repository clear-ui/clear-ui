import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class MenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base > Menu</h1>

			Menu is a component that displays list of items and allows to select from it.

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row name='value' type='string'>{`
					Currently selected value.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='onSelect' type='function(item: element)'>{`
					Handler of the selecting menu item.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='active' type='boolean'>{`
					When \`true\`, menu allows you to use keyboard to navigate and select items.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h2>MenuItem props</h2>

			<ApiDoc>
				<ApiDoc.Row name='value' type='string'>{`
					Value of the item.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='disabled' type='boolean'>{`
					Disabled state of the item.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='leftIcon' type='element'>{`
					Icon element that appears at the left side of the item.
					It can be SVG-icon, font-icon or any arbitrary element.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='rightIcon' type='element'>{`
					Icon element that appears at the right side of the item.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='onRightIconClick' type='function'>{`
					Handler of the click event on the right icon.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='indent'>{`
					When \`true\`, text in the item is aligned as in the item with \`leftIcon\`.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
