import React from 'react'

import mixin from '../utils/mixin'
import StylesMixin from '../utils/stylesMixin'

// let allIcons = require.context('./icons').keys()
// TODO use allIcons

const ICONS = {
	circle: require('./icons/circle.icon.svg'),
	close: require('./icons/close.icon.svg'),
	kebab: require('./icons/kebab.icon.svg'),
	search: require('./icons/search.icon.svg'),
	star: require('./icons/star.icon.svg'),
	triangleDown: require('./icons/triangleDown.icon.svg'),
	triangleUp: require('./icons/triangleUp.icon.svg')
}

class Icon extends React.Component {
	static propTypes = {
		icon: React.PropTypes.string.isRequired,
		inline: React.PropTypes.bool,
		/** Css size for inline icon. */
		size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
	}

	static defaultProps = {
		size: '1rem'
	}

	static ICONS = ICONS

	static styles = (props) => {
		let root
		if (props.inline) {
			root = {
				display: 'inline-block',
				verticalAlign: 'middle',
				height: props.size,
				width: props.size
			}
		} else {
			root = {
				display: 'block',
				height: '100%',
				width: '100%',
				lineHeight: '1rem'
			}
		}

		let svg = {
			verticalAlign: 'top',
			height: '100%',
			width: '100%'
		}

		return {root, svg}
	}

	render() {
		let xlink = `<use xlink:href="${this.props.icon}"></use>`
		return (
			<span style={this.styles.root}>
				<svg dangerouslySetInnerHTML={{__html: xlink}} style={this.styles.svg}/>
			</span>
		)
	}
}

export default mixin(Icon, StylesMixin)
