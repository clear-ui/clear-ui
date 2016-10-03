import React from 'react'
import ReactDOM from 'react-dom'
import {createTextMaskInputElement} from 'text-mask-core'

export default class MaskedInput extends React.Component {
	static propTypes = {
		inputType: React.PropTypes.oneOfType([
			React.PropTypes.string, React.PropTypes.func
		]).isRequired,
		getNode: React.PropTypes.func.isRequired,
		getValue: React.PropTypes.func.isRequired,
		mask: React.PropTypes.object
	}

	static defaultProps = {
		value: '',
		inputType: 'input',
		getNode: (inputRef) => ReactDOM.findDOMNode(inputRef),
		getValue: (event) => event.target.value
	}

	componentDidMount() {
		if (this.props.mask) {
			this.mask = createTextMaskInputElement({
				inputElement: this.getNode(this.inputRef),
				...this.props.mask
			})
			this.mask.update(this.props.value)
		}
	}

	componentDidUpdate() {
		if (this.props.mask) this.mask.update(this.props.value)
	}

	render() {
		let {value, mask, inputType, getNode, ...restProps} = this.props
		let props = {
			...restProps,
			ref: (ref) => this.inputRef = ref,
			onChange: this.onChange.bind(this)
		}
		if (!this.props.mask) props.value = value
		return React.createElement(inputType, props)
	}

	getNode() {
		return this.props.getNode(this.inputRef)
	}
	
	onChange(...args) {
		let value = this.props.getValue(...args)
		if (this.props.mask) this.mask.update(value)
		if (this.props.onChange) this.props.onChange(this.getNode(this.inputRef).value)
	}
}
