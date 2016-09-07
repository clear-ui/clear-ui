import React from 'react'

import StylesMixin from '../utils/stylesMixin'
import mixin from '../utils/mixin/decorator'

@mixin(StylesMixin)
export default class Input extends React.Component {
	static displayName = 'Input'

	static propTypes = {
		/** Value of the input. */
		value: React.PropTypes.string,

		/** Initial value of the input. */
		defaultValue: React.PropTypes.string,

		/**
		 * Handler of the value change.
		 *
		 * `(value: string) => void`
		 */
		onChange: React.PropTypes.func,

		/** Handler of input's focus event. */
		onFocus: React.PropTypes.func,

		/** Handler of input's blur event. */
		onBlur: React.PropTypes.func,

		/** Disabled state of the input. */
		disabled: React.PropTypes.bool,

		/** Type of the input, value of the type HTML-attribute. */
		type: React.PropTypes.string,

		/** Maximum length of the value in the input. */
		maxLength: React.PropTypes.number,

		/**
		 * If `true`, the input will be rendered using `textarea` tag.
		 * Also, it will automatically grow according to the specified
		 * maximum number of rows.
		 */
		multiline: React.PropTypes.bool,

		/** Number of rows of the multiline input. */
		rows: React.PropTypes.number,

		/** Maximum number of rows of the multiline input. */
		maxRows: React.PropTypes.number
	}

	static defaultProps = {
		rows: 1
	}

	constructor(props) {
		super(props)
		this.state = {
			rows: this.getRowsNumber(this.props.value || this.props.defaultValue)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({
				rows: this.getRowsNumber(nextProps.value)
			})
		}
	}

	render() {
		return (
			<div style={this.styles.root}>
				{this.renderInput()}
			</div>
		)
	}

	renderInput() {
		let {disabled, maxLength, name, type} = this.props

		let props = {
			key: 'input',
			ref: 'input',
			disabled,
			maxLength,
			name,
			type,
			style: this.styles.input,
			value: this.props.value,
			onChange: this.onChange.bind(this),
			onFocus: this.onFocus.bind(this),
			onBlur: this.onBlur.bind(this)
		}

		let input
		if (this.props.multiline) {
			props.rows = this.state.rows
			input = React.DOM.textarea(props)
		} else {
			input = React.DOM.input(props)
		}

		return input
	}

	getRowsNumber(value) {
    if (!value) return 1

		let matches = value.match(/\n/g)
		let valueRows = matches ? (matches.length + 1) : 1
		let rows = Math.max(this.props.rows, valueRows)
		if (this.props.maxRows) rows = Math.min(this.props.maxRows, rows)
		return rows
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

	blur() {
		if (this.refs.input) this.refs.input.blur()
	}
}
