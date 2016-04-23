import React from 'react'

import isSameOrInheritedType from '../utils/isSameOrInheritedType'
import RadioButton from './radioButton'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

@mixin(StylesMixin)
export default class RadioGroup extends React.Component {
	static propTypes = {
		/** Value of the currently selected radio button. */
		value: React.PropTypes.string,

		/**
		 * Handler of the selecting new value.
		 *
		 * (value: string) => void
		 */
		onChange: React.PropTypes.func,

		/** Makes all buttons in the radio group disabled. */
		disabled: React.PropTypes.bool
	}

	render() {
		let children = React.Children.map(this.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, RadioButton)) {
				let selected = (this.props.value !== undefined) &&
					(elem.props.value === this.props.value)
				return React.cloneElement(elem, {
					onSelect: this.onSelect.bind(this, elem),
					selected,
					disabled: elem.props.disabled || this.props.disabled
				})
			} else {
				return elem
			}
		})

		return React.DOM.div({style: this.styles.root}, children)
	}

	onSelect(elem) {
		if (this.props.onChange) this.props.onChange(elem.props.value)
	}
}
