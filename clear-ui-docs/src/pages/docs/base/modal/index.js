import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let modalPropsDoc = baseDocs['modal/index.js'].props

export default class BaseModalDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Modal</h1>

			{`
			Modal displays content in the window above the page.
			`}

			<DocPage.Note>
				This component requires instance of{' '}
				<a href='#/docs/base/zcontext'>ZContext</a>
				{' '}to be rendered on the page.
			</DocPage.Note>

			<h2>Focus management</h2>

			{`
			On open modal sets focus on the first focusable element inside.
			Also it restricts moving focus outside of the modal, e.g. with \`Tab\` key.
			On close it returns focus to previously focused element.
			`}

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={modalPropsDoc}/>

			<h3>Styleable Elements</h3>
			<ApiDoc>
				<ApiDocRow name='root'>{`
					Root element.
				`}</ApiDocRow>

				<ApiDocRow name='modal'>{`
					Modal window element.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
