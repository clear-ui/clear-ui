import React from 'react'
import Prefixer from 'inline-style-prefixer'
import composeStyles from './composeStyles'

let prefixer

function prefixStyle(style, userAgent) {
	if (!prefixer) prefixer = new Prefixer(userAgent)
	return prefixer.prefix(style)
}

function postprocessStyle(style, userAgent) {
	for (let i in style) {
		let value = style[i]
		if (value && value.rgbaString) style[i] = value.rgbaString()
	}
	return prefixStyle(style, userAgent)
}

let StylesMixin = {
	getStyles(props, state) {
		let stylesFn = composeStyles(this.constructor.styles, props.styles, {root: props.style})
		let styles = stylesFn(props, state, this.context)
		for (let elem in styles) {
			styles[elem] = postprocessStyle(styles[elem], this.context.userAgent)
		}
		this.styles = styles
	},

	componentWillMount() {
		this.__super()
		if (!this.state) this.state = {}
		this.getStyles(this.props, this.state)
	},

	componentWillUpdate(nextProps, nextState) {
		this.__super()
		this.getStyles(nextProps, nextState)
	}
}

// Use as `static contextTypes = StylesMixin.contextTypes`
Object.defineProperty(StylesMixin, 'contextTypes', {
	value: {clearUiUserAgent: React.PropTypes.string}
})

export default StylesMixin
