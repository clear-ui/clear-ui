import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let menuPropsDoc = baseDocs['menu/menu.js'].props
let menuItemPropsDoc = baseDocs['menu/item.js'].props
let menuItemWithSubMenuPropsDoc = baseDocs['menu/itemWithSubMenu.js'].props

export default class MenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Menu</h1>

			{`Menu is a component that displays list of items and allows to select from it.`}

			<h2>Menu API</h2>

			<h3>Props</h3>
			<PropsDoc doc={menuPropsDoc}/>

			<h2>MenuItem API</h2>

			<h3>Props</h3>
			<PropsDoc doc={menuItemPropsDoc}/>

			<h3>Styleable Elements</h3>
			<ApiDoc>
				<ApiDocRow name='root'>{`
					Root element.
				`}</ApiDocRow>

				<ApiDocRow name='label'>{`
					Text label.
				`}</ApiDocRow>

				<ApiDocRow name='rightIcon'>{`
					Container of the right icon.
				`}</ApiDocRow>

				<ApiDocRow name='leftIcon'>{`
					Container of the left icon.
				`}</ApiDocRow>
			</ApiDoc>

			<h2>MenuItemWithSubMenu</h2>

			{`
			A menu item may contain another menu nested inside.
			For this you need to use wrapper component \`MenuItemWithSubMenu\` instead of 
			\`MenuItem\`.

			Sub menu can be shown under the item with increased left margin
			or in the separate layer attached to the side of the item.
			Item containing sub menu shows opener icon on the right side.
			You can configure which events will trigger sub menu:
			tap, tap on the opener icon or hovering.
			`}

			<Example>
				<Example.Code>{`
					<Menu>
						<MenuItemWithSubMenu subMenu={
							<Menu>
								<MenuItem>Item 1.1</MenuItem>
								<MenuItem>Item 1.2</MenuItem>
							</Menu>
						}>
							Item 1
						</MenuItemWithSubMenu>
					</Menu>
				`}</Example.Code>
			</Example>

			<h3>Props</h3>
			<PropsDoc doc={menuItemWithSubMenuPropsDoc}/>
			
			<h3>Styleable elements</h3>
			<ApiDoc>
				<ApiDocRow name='subMenu'>{`
					Container of the sub menu.
				`}</ApiDocRow>
			</ApiDoc>
			
			<h3>Child components</h3>
			<ApiDoc>
				<ApiDocRow name='opener'>{`
					Opener icon on the right side of the item containing sub menu.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
