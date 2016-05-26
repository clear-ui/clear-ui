import React from 'react'
import Tappable from 'clear-ui-base/lib/tappable'

class MyButton extends React.Component {
	state = {tapState: {hovered: false, pressed: false}}

    render() {
        return (
			<Tappable
				onChangeTapState={(tapState) => { this.setState({tapState}) }}
				onTap={() => { this.props.onTap && this.props.onTap() }}
			>
				<div style={this.getStyle()}>{this.props.children}</div>
			</Tappable>
		)
    }

	getStyle() {
		let style = {
		    display: 'inline-block',
			padding: '0.5rem 1rem',
			background: '#eee',
			transition: 'background 0.1s',
			cursor: 'pointer',
			userSelect: 'none',
			webkitTapHighlightColor: 'rgba(0,0,0,0)'
		}

		if (this.state.tapState.pressed) {
			style.background = '#666'
			style.color = 'white'
		} else if (this.state.tapState.hovered) {
			style.background = '#ccc'
		}

		return style
	}
}

export default function TappableExample() {
	return <MyButton>Button</MyButton>
}
