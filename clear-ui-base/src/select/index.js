import React from 'react'

import isSameOrInheritedType from '../utils/isSameOrInheritedType'
import {MenuItem} from '../menu'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'

@mixin(StylesMixin, ChildComponentsMixin)
export default class Select extends React.Component {
	static displayName = 'Select'

	static propTypes = {
		/** Value of the select. */
		value: React.PropTypes.string,

		/** Handler of value change. */
		onChange: React.PropTypes.func,

		/** Label in the select when it has no selected value. */
		label: React.PropTypes.node,

		/** Disabled state of the select */
		disabled: React.PropTypes.bool
	}

	static defaultProps = {
		label: 'select value'
	}

	static childComponents = {
		dropdownMenu: null
	}

	render() {
		let {value, disabled, onChange} = this.props
		return React.cloneElement(this.getChildComponent('dropdownMenu'), {
			value,
			disabled,
			onSelect: onChange,
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) },
			trigger: this.renderTrigger()
		}, this.props.children)
	}

	/* Returns content of currently selected element or placeholder text. */
	renderTriggerContent() {
		if (this.props.value !== undefined) {
			let childrenArray = React.Children.toArray(this.props.children)
			for (let i in childrenArray) {
				let elem = childrenArray[i]
				if (isSameOrInheritedType(elem.type, MenuItem) &&
					elem.props.value === this.props.value
				) {
					return <div style={this.styles.value}>{elem.props.children}</div>
				}
			}
		} else {
			return <div style={this.styles.label}>{this.props.label}</div>
		}
	}

	/*
	 * method
	 * abstract
	 * returns {element}
	 */
	renderTrigger() {
		throw new Error('Not implemented')
	}
}
