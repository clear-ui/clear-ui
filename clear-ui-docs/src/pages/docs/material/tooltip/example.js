import React from 'react'
import Tooltip from 'clear-ui-material/lib/tooltip'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

export default function TooltipExample() {
	return (
		<Tooltip tooltip={'Content of the tooltip'}>
			<RaisedButton>Tooltip</RaisedButton>
		</Tooltip>
	)
}
