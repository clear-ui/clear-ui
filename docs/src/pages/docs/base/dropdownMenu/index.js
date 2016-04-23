import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let dropdownMenuPropsDoc = baseDocs['dropdownMenu/index.js'].props

export default class DropdownMenuDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Dropdown Menu</h1>

			<h2>Props</h2>

			<PropsDoc doc={dropdownMenuPropsDoc}/>
		</DocPage>
	}
}
