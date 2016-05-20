import React from 'react'

import mixin from '../utils/mixin/decorator'
import ChildComponentsMixin from '../utils/childComponentsMixin'

@mixin(ChildComponentsMixin)
export default class RadioButton extends React.Component {
	static propTypes = {
		/** Value of the radio button. */
		value: React.PropTypes.string,

		/** Makes this radio button disabled. */
		disabled: React.PropTypes.bool,

		/** HTML `tabIndex` attribute. */
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),

		preventFocusOnTap: React.PropTypes.bool,

		/**
		 * Used internally by `RadioGroup` component.
		 * To make button selected you should use prop `value` on `RadioGroup`.
		 */
		selected: React.PropTypes.bool,

		/**
		 * Used internally by `RadioGroup` component.
		 * To handle selecting of the value you should use prop `onChange` on `RadioGroup`.
		 */
		onSelect: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	static childComponents = {
		switch: null
	}

	render() {
		return React.cloneElement(this.getChildComponent('switch'), {
			...this.props,
			isSwitched: this.props.selected,
			onSwitch: this.props.onSelect
		}, this.props.children)
	}
}
