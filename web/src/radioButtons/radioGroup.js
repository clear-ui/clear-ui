import React from 'react'

import BaseRadioButton from 'clear-ui-base/lib/radioButtons/radioButton'
import BaseRadioGroup from 'clear-ui-base/lib/radioButtons/radioGroup'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'

export default class RadioGroup extends BaseRadioGroup {
	static defaultProps = {
		height: 'default',
		padding: 'default'
	}

	render() {
		let root = super.render()

		let {height, padding} = this.props
		let children = React.Children.map(root.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, BaseRadioButton)) {
				return React.cloneElement(elem, {height, padding})
			} else {
				return elem
			}
		})

		return React.cloneElement(root, null, children)
	}
}
