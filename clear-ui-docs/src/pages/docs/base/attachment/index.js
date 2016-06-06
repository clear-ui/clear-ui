import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let attachmentPropsDoc = baseDocs['attachment/index.js'].props

import AttachmentExample from './example.js'
import attachmentExampleCode from '!raw!./example.js'

export default class BaseAttachmentDoc extends React.Component {
	render() {
		let element = (
			<div style={{
				position: 'absolute',
				width: 100,
				height: 50,
				lineHeight: '50px',
				textAlign: 'center',
				border: '1px solid rgb(204, 204, 204)',
				background: 'white'
			}}>
				Element
			</div>
		)

		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Attachment</h1>
			
			{`
			Attachment is a component that makes element stay next to another element,
			connecting two attachment points on the elements. 
			It renders attached element in the separate \`ZContext.Layer\`.
			`}

			<DocPage.Note>
				This component requires instance of{' '}
				<a href='#/docs/base/zcontext'>ZContext</a>
				{' '}to be rendered on the page.
			</DocPage.Note>

			<h2>Example</h2>

			{`
			Top right corner of the element is attached to the top left corner of the target
			with horizontal offset 5px.
			`}

			<Example>
				<Example.Demo>
					<AttachmentExample/>
				</Example.Demo>
				<Example.Code>
					{attachmentExampleCode}
				</Example.Code>
			</Example>

			<h2>API</h2>

			<h3>Props</h3>
			<PropsDoc doc={attachmentPropsDoc}/>
		</DocPage>
	}
}
