
import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'
import Example from '../../../../example'

import SideNavExample from './example.js'
import sideNavExampleCode from '!raw!./example.js'

import baseDocs from '../../../../../docgen/base.json'
let sideNavPropsDoc = baseDocs['sideNav/index.js'].props

export default class SideNavDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>SideNav</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<SideNavExample/>
				</Example.Demo>
				<Example.Code>
					{sideNavExampleCode}
				</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={sideNavPropsDoc}/>

			<h3>Styleable Elements</h3>
			<ApiDoc>
				<ApiDocRow name='root'>{`
					Root element that can be used as overlay.
				`}</ApiDocRow>

				<ApiDocRow name='modal'>{`
					Side nav element.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
