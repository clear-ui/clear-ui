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

	constructor(props) {
		super(props)
		this.state = {tapState: 'initial'}
		//this.initManagedState(['tapState'])
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

export default Switch
