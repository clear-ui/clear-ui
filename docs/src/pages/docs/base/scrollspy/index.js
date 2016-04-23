import React from 'react'
import $ from 'jquery'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'
import Example from '../../../../example'

import ScrollspyExample from './example.js'
import scrollspyExampleCode from '!raw!./example.js'

import baseDocs from '../../../../../docgen/base.json'
let scrollspyPropsDoc = baseDocs['scrollspy/index.js'].props

export default class ScrollspyDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Scrollspy</h1>

			Scrollspy is a component for automatically updating value
			based on scroll position.

			<h2>Example</h2>

			{`
			This example uses custom container element.
			Since you can't provide \`ref\` to the container element
			when it is rendered in the same \`render()\` function,
			you should use deferreds.
			`}

			<Example>
				<Example.Demo>
					<ScrollspyExample/>
				</Example.Demo>
				<Example.Code lang='xml'>
					{scrollspyExampleCode}
				</Example.Code>
			</Example>

			<h2>Props</h2>

			<PropsDoc doc={scrollspyPropsDoc}/>

			<h2>Methods</h2>

			<ApiDoc>
				<ApiDoc.Row name='scrollToAnchor(anchorId)'>{`
					Scrolls to anchor specified by its id.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
