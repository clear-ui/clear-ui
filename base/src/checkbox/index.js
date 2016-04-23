import React from 'react'

import mixin from '../utils/mixin/decorator'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import StylesMixin from '../utils/stylesMixin'

@mixin(StylesMixin, ChildComponentsMixin)
export default class Checkbox extends React.Component {
	static propTypes = {
		/** Value of the checkbox. */
		value: React.PropTypes.bool,

		/** Handler of the toggling checkbox state. */
		onChange: React.PropTypes.func,

		/** Disabled state of the checkbox. */
		disabled: React.PropTypes.bool,

		/** HTML tabIndex attribute. */
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),

		preventFocusOnTap: React.PropTypes.bool
	}

	static childComponents = {
		switch: null
	}

	render() {
		return React.DOM.div({style: this.styles.root},
			React.cloneElement(this.getChildComponent('switch'), {
				...this.props,
				isSwitched: this.props.value,
				onSwitch: this.onChange.bind(this)
			}, this.props.children)
		)
	}

	onChange() {
		if (this.props.onChange) this.props.onChange(!this.props.value)
	}
}
