import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let inputPropsDoc = baseDocs['input/index.js'].props

export default class InputDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Input</h1>

			{`
			Base text input component.
			`}

			<h2>Props</h2>

			<PropsDoc doc={inputPropsDoc}/>
		</DocPage>
	}
}

