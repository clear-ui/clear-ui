import React from 'react'
import Markdown from 'react-markdown-it'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'

import css from './index.css'

class ApiDoc extends React.Component {
	render() {
		let children = React.Children.toArray(this.props.children).map((elem, index) => {
			return React.cloneElement(elem, {even: index % 2 === 0})
		})
		return <div>{children}</div>
	}
}

@mixin(StylesMixin)
class ApiDocRow extends React.Component {
	static styles = (props) => {
		return {
			root: {
				fontSize: '0.95rem',
				padding: '1rem',
				paddingBottom: '1px' // to collapse padding with last paragraps's margin
			},
			header: {marginBottom: '1rem'},
			content: {
				/* container to collapse bottom padding with bottom margin of last paragraph */
				marginBottom: '1rem'
			},
			name: {fontWeight: 'bold'}
		}
	}

	render() {
		let header
		if (this.props.name || this.props.header) {
			let name
			if (this.props.name) name = <div style={this.styles.name}>{this.props.name}</div>
			header = (
				<div style={this.styles.header}>
					{name}
					{this.props.header}
				</div>
			)
		}
		return (
			<div style={this.styles.root} className={css.row}>
				{header}
				<div style={this.styles.content}>
					<Markdown options={{html: true}}>
						{this.props.children}
					</Markdown>
				</div>
			</div>
		)
	}
}

export {ApiDoc, ApiDocRow}
