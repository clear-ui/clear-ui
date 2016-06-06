import React from 'react'

function getStyle(props) {
	let color
	if (props.level === 'critical') color = 'red'
	if (props.level === 'warning') color = '#FFF59D'
	return {
		color: '#212121',
		background: color,
		padding: '1rem',
		fontSize: '0.95rem'
	}
}

function Note(props) {
	return <div style={getStyle(props)}>{props.children}</div>
}

Note.defaultProps = {
	level: 'warning'
}

export default Note
