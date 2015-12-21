import React from 'react'

import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

@mixinDecorator(StylesMixin)
class RadioButton extends React.Component {
	static propTypes = {
		...FocusableTappable.propTypes,
		value: React.PropTypes.bool,
		onSelect: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	render() {
		let {disabled, tabIndex, preventFocusOnTap} = this.props
		return React.createElement(FocusableTappable, {
			disabled, tabIndex, preventFocusOnTap,
			onTap: this.props.onSelect,
			onChangeState: (state) => { this.setState({state}) },
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) },
		}, this.renderContainer())
	}

	/** @abstract */
	renderContainer() {
		throw new Error('Not implemented')
	}
}

export default RadioButton
