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

			{`
			Dropdown Menu is a component that shows menu under an element
			and allows to select items from it.

			This component requires instance of [ZContext](#/docs/base/zcontext) to
			be rendered on the page.
			`}

			<h2>API</h2>

			<h3>Props</h3>

			<PropsDoc doc={dropdownMenuPropsDoc}/>
		</DocPage>
	}
}
