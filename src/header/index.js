import React from 'react'
import {Link} from 'react-router'

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
				fontSize: '1.15rem',
				fontWeight: 500,
				textTransform: 'uppercase'
			}
		}
	}

	render() {
		return (
			<div style={this.styles.root}>
				<HeaderItem link='/' styles={{root: this.styles.title}}>
					{this.props.title}
				</HeaderItem>
				{this.props.children}
			</div>
		)
	}
}

@mixinDecorator(StylesMixin)
class HeaderItem extends React.Component {
	static styles = {
		root: {
			padding: '0 1rem',
			color: 'white',
			textDecoration: 'none',
			cursor: 'pointer',
			display: 'inline-block'
		},

		active: {
			background: 'rgba(255,255,255,.15)'
		}
	}

	render() {
		return (
			<Link
				style={this.styles.root}
				activeStyle={this.styles.active}
				to={this.props.link}
			>
				{this.props.children}
			</Link>
		)
	}
}

export {HeaderItem}
export default Header
