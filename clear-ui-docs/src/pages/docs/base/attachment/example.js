import React from 'react'
import Attachment from 'clear-ui-base/lib/attachment'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton.js'

export default function AttachmentExample() {
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

	return <Attachment
		open={true}
		element={element}
		attachment={{
			target: 'right top',
			element: 'left top',
			offset: '5px 0'
		}}>
		<RaisedButton>Target</RaisedButton>
	</Attachment>
}
