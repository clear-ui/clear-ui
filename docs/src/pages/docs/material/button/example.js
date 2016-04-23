import React from 'react'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import ActionButton from 'clear-ui-material/lib/button/actionButton'

export default function ButtonExample() {
	return (
		<div>
			<RaisedButton>Raised button</RaisedButton>
			{' '}
			<FlatButton>Flat button</FlatButton>
			{' '}
			<ActionButton>A</ActionButton>
		</div>
	)
}
