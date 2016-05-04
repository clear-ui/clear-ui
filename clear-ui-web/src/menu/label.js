import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import getIconElementStyle from '../styles/getIconElementStyle'

@mixin(StylesMixin)
export default class Label extends React.Component {
	static defaultProps = {
		height: 'default',
		padding: 'default'
	}

	static styles = (props) => {
		let {root, label} = getIconElementStyle(props)

		root = {
			...root,
			marginTop: '1rem',
			textTransform: 'uppercase',
			fontWeight: 500
		}

		return {root, label}
	}

	render() {
		return (
			<div style={this.styles.root}>
				<div style={this.styles.label}>{this.props.children}</div>
			</div>
		)
	}
}
