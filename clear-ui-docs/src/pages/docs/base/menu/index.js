import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../propsDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let menuPropsDoc = baseDocs['menu/index.js'].props
let menuItemPropsDoc = baseDocs['menu/item.js'].props

export default class MenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Menu</h1>

			{`Menu is a component that displays list of items and allows to select from it.`}

			<h2>Props</h2>
			<PropsDoc doc={menuPropsDoc}/>

			<h2>MenuItem Props</h2>
			<PropsDoc doc={menuItemPropsDoc}/>
		</DocPage>
	}
}
