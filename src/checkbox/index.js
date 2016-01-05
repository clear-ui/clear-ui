import React from 'react'

import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

@mixinDecorator(StylesMixin)
class Checkbox extends React.Component {
	static propTypes = {
		...FocusableTappable.propTypes,
		value: React.PropTypes.bool,
		onChange: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	render() {
		let {disabled, tabIndex, preventFocusOnTap} = this.props
		return React.createElement(FocusableTappable, {
			disabled, tabIndex, preventFocusOnTap,
			onTap: this.onChange.bind(this),
			onChangeState: (state) => { this.setState({state}) },
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) },
		}, this.renderContainer())
	}

	/**
	 * @method
	 * @abstract
	 * @return {element} Root element of the checkbox.
	 */
	renderContainer() {
		throw new Error('Not implemented')
	}

	onChange() {
		if (this.props.onChange) this.props.onChange(!this.props.value)
	}
}

export default Checkbox
