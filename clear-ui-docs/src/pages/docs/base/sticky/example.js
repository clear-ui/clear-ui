import React from 'react'
import $ from 'jquery'
import Sticky from 'clear-ui-base/lib/sticky'

const containerStyle = {
	height: 200, border: '1px solid #ccc'
}

const stickyStyle = {
	width: '100%', height: 50, lineHeight: '50px',
	textAlign: 'center', background: '#eee'
}

export default class StickyExample extends React.Component {
	render() {
		let deferred = $.Deferred()

		return <div style={containerStyle}
			ref={(elem) => {deferred.resolve(elem)}}>
			<Sticky offset={20} container={deferred}>
				<div style={stickyStyle}>
					This will be fixed at the top with offset 20px.
				</div>
			</Sticky>
			<p>This is container.</p>
		</div>
	}
}
