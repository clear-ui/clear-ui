import React from 'react'

import StylesMixin from '../utils/stylesMixin'
import mixinDecorator from '../utils/mixin/decorator'

@mixinDecorator(StylesMixin)
export default class Input extends React.Component {
	static displayName = 'Input'

	static propTypes = {
		/** Value of the input. */
		value: React.PropTypes.string,

		/**
		 * (string) => void
		 *
		 * Handler of input's focus event.
		 */
		onChange: React.PropTypes.func,

		/** Handler of input's focus event. */
		onFocus: React.PropTypes.func,

		/** Handler of input's blur event. */
		onBlur: React.PropTypes.func,

		/** Disabled state of the input. */
		disabled: React.PropTypes.bool,

		/**
		 * If `true`, the input will be rendered using `textarea` tag.
		 * Also, it will automatically grow according to the specified number
		 * of maximum rows.
		 */
		multiline: React.PropTypes.bool,

		/** Number of rows of multiline input. */
		rows: React.PropTypes.number,

		/** Maximum number of rows of multiline input. */
		maxRows: React.PropTypes.number
	}

	static defaultProps = {
		rows: 1,
		value: ''
	}

	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value,
			rows: this.getRowsNumber(this.props.value)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.value !== nextProps.value) {
			this.setState({
				value: nextProps.value,
				rows: this.getRowsNumber(nextProps.value)
			})
		}
	}

	getRowsNumber(value) {
		let matches = value.match(/\n/g)
		let valueRows = matches ? (matches.length + 1) : 1
		let rows = Math.max(this.props.rows, valueRows)
		if (this.props.maxRows) rows = Math.min(this.props.maxRows, rows)
		return rows
	}

	render() {
		let props = {
			style: this.styles.input,
			value: this.state.value,
			disabled: this.props.disabled,
			maxLength: this.props.maxLength,
			onChange: this.onChange.bind(this),
			onFocus: this.onFocus.bind(this),
			onBlur: this.onBlur.bind(this),
			ref: 'input'
		}

		let input
		if (this.props.multiline) {
			props.rows = this.state.rows
			input = React.DOM.textarea(props)
		} else {
			input = React.DOM.input(props)
		}

		return React.DOM.div({style: this.styles.root}, input)
	}

	onChange(event) {
		let value = event.target.value
		if (this.props.onChange) this.props.onChange(value)
	}

	onFocus() {
		this.setState({focused: true})
		if (this.props.onFocus) this.props.onFocus()
	}

	onBlur() {
		this.setState({focused: false})
		if (this.props.onBlur) this.props.onBlur()
	}

	focus() {
		if (this.refs.input) this.refs.input.focus()
	}
}
