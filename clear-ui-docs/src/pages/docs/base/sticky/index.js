import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import StickyExample from './example.js'
import stickyExampleCode from '!raw!./example.js'

import baseDocs from '../../../../../docgen/base.json'
let stickyPropsDoc = baseDocs['sticky/index.js'].props

export default class StickyDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Sticky</h1>

			{`
			Sticky is a component that fixes its content near the edge of the screen
			when it leaves viewport while scrolling.

			When content becomes fixed, component inserts placeholder
			with height equal to the height of the content.
			`}

			<h2>Example</h2>

			{`
			This example uses container.
			Sticky element is pushed to top by the lower edge of the container.

			Since you can't provide <code>ref</code> to the container element
			when it is rendered in the same <code>render()</code> function,
			you should use deferreds.
			`}

			<Example>
				<Example.Demo>
					<StickyExample/>
				</Example.Demo>
				<Example.Code>
					{stickyExampleCode}
				</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={stickyPropsDoc}/>
		</DocPage>
	}
}
