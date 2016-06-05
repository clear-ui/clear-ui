import React from 'react'
import Tooltip from 'clear-ui-web/lib/tooltip'

export default function TooltipExample() {
	const elementStyle = {
		display: 'inline-block',
		padding: '0.5rem 1rem',
		background: '#eee',
		cursor: 'default',
		userSelect: 'none',
		webkitTapHighlightColor: 'rgba(0,0,0,0)'
	}

	return (
		<Tooltip tooltip='Content of the tooltip!'>
			<div style={elementStyle}>Show tooltip on hover</div>
		</Tooltip>
	)
}
