import React from 'react'
import Tooltip from 'clear-ui-simple/lib/tooltip'

export default function TooltipExample() {
	const elementStyle = {
		display: 'inline-block',
		padding: '0.5rem 1rem',
		background: '#eee',
		cursor: 'default',
		userSelect: 'none',
		webkitTapHighlightColor: 'rgba(0,0,0,0)'
	}

	const tooltip = 'Content of the tooltip!'

	return (
		<Tooltip tooltip={tooltip}>
			<div style={elementStyle}>Show tooltip on hover</div>
		</Tooltip>
	)
}
