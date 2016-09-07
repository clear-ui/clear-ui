import React from 'react'
import {createTextMaskInputElement} from 'text-mask-core'

export default class MaskedInputWrapper extends React.Component {
	static defaultProps = {
		component: null
	}

	getInputElement() {
		return this.refs.input.refs.input
	}

	componentDidMount() {
		this.mask = createTextMaskInputElement({
			inputElement: this.getInputElement(),
			...this.props.mask
		})
		this.mask.update(this.props.value)
	}

	componentDidUpdate() {
		this.mask.update(this.props.value)
	}

	render() {
		let {value, mask, component, ...restProps} = this.props
		return React.createElement(component, {
			...restProps,
			ref: 'input',
			defaultValue: value,
			onChange: this.onChange.bind(this)
		})
	}
	
	onChange(value) {
		this.mask.update(value)
		if (this.props.onChange) this.props.onChange(this.getInputElement().value)
	}
}
