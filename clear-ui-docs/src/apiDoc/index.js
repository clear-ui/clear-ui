import React from 'react'
import Markdown from 'react-markdown-it'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from 'clear-ui-web/lib/styles/colors'

import styles from './index.css'

class ApiDoc extends React.Component {
	render() {
		let [first, ...rest] = React.Children.toArray(this.props.children)
		let children = [
			first && React.cloneElement(first, {first: true}),
			...rest
		]
		return React.DOM.div({style: {fontSize: '95%'}}, children)
	}
}

class ApiDocRow extends React.Component {
	render() {
		let header
		if (this.props.name || this.props.type || this.props.defaultValue) {
			let name, type, defaultValue

			if (this.props.name) name = <div className={styles.name}>{this.props.name}</div>
			if (this.props.type) type = <div>type: <code>{this.props.type}</code></div>
			if (this.props.defaultValue) {
				defaultValue = <div>default: <code>{this.props.defaultValue}</code></div>
			}

			header = React.DOM.div({className: styles.header}, [name, type, defaultValue])
		}

		return (
			<div className={styles.row}>
				{header}
				<div className={styles.container}>
					<Markdown options={{html: true}}>{this.props.children}</Markdown>
				</div>
			</div>
		)
	}
}

ApiDoc.Row = ApiDocRow
export default ApiDoc
export {ApiDocRow}
