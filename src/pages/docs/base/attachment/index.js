import React from 'react'

import Attachment from 'clear-ui-base/lib/attachment'
import RaisedButton from 'clear-ui-simple/lib/button/raisedButton.js'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let attachmentPropsDoc = baseDocs['attachment/index.js'].props

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
			It renders attached element in separate \`ZContext.Layer\`.
			`}

			<h2>Example</h2>

			{`
			Top right corner of the element is attached to the top left corner of the target
			with horizontal offset 5px.
			`}

			<Example>
				<Example.Demo>
					<Attachment
						open={true}
						element={element}
						attachment={{
							target: 'right top',
							element: 'left top',
							offset: '5px 0'
						}}>
						<RaisedButton>Target</RaisedButton>
					</Attachment>
				</Example.Demo>
				<Example.Code lang='xml'>{`
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

					<Attachment
						open={true}
						element={element}
						attachment={{
							target: 'right top',
							element: 'left top',
							offset: '5px 0'
						}}>
						<RaisedButton>Target</RaisedButton>
					</Attachment>
				`}</Example.Code>
			</Example>

			<h2>Props</h2>
			<PropsDoc doc={attachmentPropsDoc}/>
		</DocPage>
	}
}
