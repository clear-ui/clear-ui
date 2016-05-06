import React from 'react'
import {Link} from 'react-router'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import BindMethodsMixin from 'clear-ui-base/lib/utils/bindMethodsMixin'
import Tappable from 'clear-ui-base/lib/tappable'

@mixin(StylesMixin)
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

@mixin(StylesMixin, BindMethodsMixin)
class HeaderItem extends React.Component {
	static contextTypes = {
		history: React.PropTypes.object.isRequired
	}

	static styles = (props, state) => {
		let root = {
			padding: '0 1rem',
			color: 'white',
			textDecoration: 'none',
			cursor: 'pointer',
			display: 'inline-block'
		}

		let active = {background: 'rgba(255,255,255,.15)'}

		if (state.tapState === 'hovered' || state.tapState === 'active') {
			Object.assign(root, active)
		}

		return {root, active}
	}

	constructor() {
		super()
		this.bindMethods('onChangeTapState')
	}

	render() {
		let elem
		if (this.props.external) {
			let {link, target} = this.props
			elem = (
				<a href={link} target={target} style={this.styles.root}>
					{this.props.children}
				</a>
			)
		} else {
			elem = (
				<Link
					onlyActiveOnIndex={this.props.onlyIndex}
					to={this.props.link}
					style={this.styles.root}
					activeStyle={this.styles.active}
				>
					{this.props.children}
				</Link>
			)
		}

		return <Tappable onChangeTapState={this.onChangeTapState}>{elem}</Tappable>
	}

	onChangeTapState({hovered, pressed}) {
		this.setState({
			tapState: pressed ? 'active' : (hovered ? 'hovered' : 'initial')
		})
	}
}

export {HeaderItem}
export default Header
