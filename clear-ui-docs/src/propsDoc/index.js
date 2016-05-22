import React from 'react'

import {ApiDoc, ApiDocRow} from '../apiDoc'
// import COLORS from 'clear-ui-web/lib/styles/colors'

function generatePropType(type) {
	if (type.name === 'func') return 'function'
	if (type.name === 'custom') return type.raw

	/*
	From:
	{
		"name": "union",
		"value": [
			{"name": "number"},
			{"name": "string"}
		]
	}
	To: number|string
	*/
	if (type.name === 'union') {
		return type.value.map(generatePropType).join('|')
	}

	/*
	From:
	{
		"name": "enum",
		"value": [
			{"value": "'a'", "computed": false},
			{"value": "'b'", "computed": false},
		]
	}
	To: 'a'|'b'
	*/
	if (type.name === 'enum') {
		if (Array.isArray(type.value)) {
			return type.value.map(val => val.value).join('|')
		} else {
			return type.value
		}
	}

	return type.name
}

class PropDoc extends React.Component {
	render() {
		let type, defaultValue
		if (this.props.type) {
			type = (
				<div>
					type:
					{' '}
					<code>{generatePropType(this.props.type)}</code>
				</div>
			)
		}
		if (this.props.defaultValue && this.props.defaultValue.value) {
			defaultValue = <div>default: <code>{this.props.defaultValue.value}</code></div>
		}

		return (
			<ApiDocRow name={this.props.name} header={[type, defaultValue]}>
				{this.props.description}
			</ApiDocRow>
		)
	}
}

export default class PropsDoc extends React.Component {
	render() {
		let base
		if (this.props.base) {
			base = (
				<ApiDocRow>
					<a href={this.props.base.url}>{this.props.base.name}</a>
				</ApiDocRow>
			)
		}

		let props = []
		for (let name in this.props.doc) {
			let propDoc = this.props.doc[name]
			props.push(<PropDoc name={name} {...propDoc}/>)
		}

		return (
			<ApiDoc>
				{base}
				{props}
			</ApiDoc>
		)
	}
}
