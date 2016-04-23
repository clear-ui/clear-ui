import React from 'react'

import FocusableTappable from '../focusableTappable'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

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
		}, this.renderContainer())
	}

	/**
	 * @method
	 * @abstract
	 * @return {element} Root element of the switch.
	 */
	renderContainer() {
		throw new Error('Not implemented')
	}
}
