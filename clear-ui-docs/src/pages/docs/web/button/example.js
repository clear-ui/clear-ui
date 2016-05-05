import React from 'react'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton'
import FlatButton from 'clear-ui-web/lib/button/flatButton'
import OutlinedButton from 'clear-ui-web/lib/button/outlinedButton'

export default function ButtonExample() {
	return <div>
		<RaisedButton>Raised button</RaisedButton>
		{' '}
		<FlatButton>Flat button</FlatButton>
		{' '}
		<OutlinedButton>Outlined button</OutlinedButton>
	</div>
}
