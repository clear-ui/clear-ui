import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let menuPropsDoc = baseDocs['menu/menu.js'].props
let menuItemPropsDoc = baseDocs['menu/item.js'].props

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

				<ApiDocRow name='subMenu'>{`
					Container of the nested items.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
