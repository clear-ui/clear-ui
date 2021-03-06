import React from 'react'

import {FocusableTappable} from '../tappable'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

/** Base component for displaying and toggling boolean state. */
@mixin(StylesMixin)
export default class Switch extends React.Component {
	static propTypes = {
		disabled: React.PropTypes.bool,
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
		preventFocusOnTap: React.PropTypes.bool,
		isSwitched: React.PropTypes.bool,
		onSwitch: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	constructor(props) {
		super(props)
		this.state = {tapState: {hovered: false, pressed: false}}
	}

	render() {
		let {disabled, tabIndex, preventFocusOnTap} = this.props
		return React.createElement(FocusableTappable, {
			disabled,
			tabIndex,
			preventFocusOnTap,
			onTap: this.props.onSwitch,
			onChangeTapState: (tapState) => { this.setState({tapState}) },
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderRoot())
	}

	renderRoot() {
		let label
		if (this.props.children) {
			label = <div key='label' style={this.styles.label}>{this.props.children}</div>
		}

		return (
			<div style={this.styles.root}>
				{this.renderSwitchElement()}
				{label}
			</div>
		)
	}

	renderSwitchElement() {
		return <div key='switchElement' style={this.styles.switchElement}/>
	}
}
