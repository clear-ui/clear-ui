import React from 'react'

import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

@mixinDecorator(StylesMixin)
class Switch extends React.Component {
	static propTypes = {
		...FocusableTappable.propTypes, // TODO no
		isSwitched: React.PropTypes.bool,
		onSwitch: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	render() {
		let {disabled, tabIndex, preventFocusOnTap} = this.props
		return React.createElement(FocusableTappable, {
			disabled,
			tabIndex,
			preventFocusOnTap,
			onTap: this.props.onSwitch,
			onChangeState: (state) => { this.setState({state}) },
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

export default Switch
