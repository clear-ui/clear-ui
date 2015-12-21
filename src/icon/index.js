import React from 'react'

import mixin from '../utils/mixin'
import StylesMixin from '../utils/stylesMixin'

let propTypes = React.PropTypes

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
		icon: propTypes.string.isRequired
	}

	static ICONS = ICONS

	static styles = {
		root: {
			//display: 'inline-block',
			//height: '1rem',
			//width: '1rem',
			display: 'block',
			height: '100%',
			width: '100%',
			lineHeight: '1rem'
		},
		svg: {
			verticalAlign: 'top',
			height: '100%',
			width: '100%'
		}
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
