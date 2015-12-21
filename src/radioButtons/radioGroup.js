import React from 'react'

import isSameOrInheritedType from '../utils/isSameOrInheritedType'
import RadioButton from './radioButton'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

@mixinDecorator(StylesMixin)
class RadioGroup extends React.Component {
	render() {
		//let childrenArray = React.Children.toArray(this.props.children)
		//let children = childrenArray.map((elem, index) => {
		let children = React.Children.map(this.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, RadioButton)) {
				let selected = (this.props.value !== undefined) &&
					(elem.props.value === this.props.value)
				return React.cloneElement(elem, {
					onSelect: this.onSelect.bind(this, elem),
					selected,
					disabled: elem.props.disabled || this.props.disabled
					//,
					//first: index === 0,
					//last: index === childrenArray.length - 1
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

export default RadioGroup
