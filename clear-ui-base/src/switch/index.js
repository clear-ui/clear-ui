import React from 'react'

import {FocusableTappable} from '../tappable'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

/** Base component that can display switched state and change it to opposite on tap. */
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
		this.state = {tapState: 'initial'}
	}

	render() {
		let {disabled, tabIndex, preventFocusOnTap} = this.props
		return React.createElement(FocusableTappable, {
			disabled,
			tabIndex,
			preventFocusOnTap,
			onTap: this.props.onSwitch,
			onChangeTapState: ({hovered, pressed}) => {
				this.setState({
					tapState: pressed ? 'active' : (hovered ? 'hovered' : 'initial')
				})
			},
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderRoot())
	}

	renderRoot() {
		let label
		if (this.props.children) {
			label = <div style={this.styles.label}>{this.props.children}</div>
		}

		return (
			<div style={this.styles.root}>
				{this.renderSwitchElement()}
				{label}
			</div>
		)
	}

	renderSwitchElement() {
		return <div style={this.styles.switchElement}/>
	}
}
