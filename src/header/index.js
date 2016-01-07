import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'

@mixinDecorator(StylesMixin)
class Header extends React.Component {
	static styles = (props) => {
		return {
			root: {
				height: '4rem',
				lineHeight: '4rem',
				padding: '0 1rem',
				background: props.color,
				color: 'white'
			},

			title: {
				cursor: 'pointer',
				display: 'inline-block',
				fontSize: '1.15rem',
				fontWeight: 500,
				textTransform: 'uppercase'
			}
		}
	}

	render() {
		return (
			<div style={this.styles.root}>
				<div style={this.styles.title}>
					{this.props.title}
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Header
