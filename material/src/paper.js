import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'

import SHADOWS from './styles/shadows'
import ThemeMixin from './themeMixin'

@mixinDecorator(StylesMixin, ThemeMixin)
class Paper extends React.Component {
	static contextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	static defaultProps = {
		elevation: 2
	}

	static styles = (props, state) => {
		let root = {
			background: state.theme.background,
			boxShadow: SHADOWS[props.elevation],
			borderRadius: 2
		}
		if (props.padding) root.padding = 16
		return {root}
	}

	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

export default Paper
