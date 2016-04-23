import React from 'react'

import mixin from '../utils/mixin/decorator'
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

@mixin(StylesMixin)
export default class Icon extends React.Component {
	static propTypes = {
		/** Name of the SVG-symbol of the icon. */
		icon: React.PropTypes.string.isRequired,

		/**
		 * Inline style of the icon that sets specified sizes and aligns itself with the text.
		 */
		inline: React.PropTypes.bool,

		/** Css size of the inline icon. */
		size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
	}

	static defaultProps = {
		size: '1.5rem'
	}

	static ICONS = ICONS

	static styles = (props) => {
		let root, svg

		if (props.inline) {
			root = {
				display: 'inline-block',
				lineHeight: typeof props.size === 'number' ? `${props.size}px` : props.size
			}

			svg = {
				height: props.size,
				width: props.size,
				verticalAlign: 'top'
			}
		} else {
			root = {
				display: 'block',
				height: '100%',
				width: '100%'
			}

			svg = {
				verticalAlign: 'top',
				height: '100%',
				width: '100%'
			}
		}

		return {root, svg}
	}

	render() {
		// let xlink = `<use xlink:href="${this.props.icon}"></use>`
		// <svg dangerouslySetInnerHTML={{__html: xlink}} style={this.styles.svg}/>

		return (
			<span style={this.styles.root}>
				<svg style={this.styles.svg}>
					<use xlinkHref={this.props.icon}/>
				</svg>
			</span>
		)
	}
}
