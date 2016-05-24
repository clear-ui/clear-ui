import React from 'react'
import color from 'color'

import {FocusableTappable} from 'clear-ui-base/lib/tappable'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import ManagedStateMixin from 'clear-ui-base/lib/utils/managedStateMixin'

import COLORS from '../styles/colors'

@mixinDecorator(StylesMixin, ManagedStateMixin)
class Link extends React.Component {
	static defaultProps = {
		preventFocusOnTap: true
	}

	static styles = (props, state) => {
		let root = {}

		if (props.disabled) {
			root.color = COLORS.black3
			root.cursor = 'default'
		} else {
			root.cursor = 'pointer'
			root.color = COLORS.blue
			if (state.tapState.hovered) {
				root.textDecoration = 'underline'
			}
			if (state.tapState.pressed) {
				root.color = color(COLORS.blue).mix(color('black'), 0.9)
			}
		}

		//if (state.focused) root.outline.

		return {root}
	}

	state = {tapState: {hovered: false, pressed: false}}

	render() {
		return React.createElement(FocusableTappable, {
			preventFocusOnTap: this.props.preventFocusOnTap,
			disabled: this.props.disabled,
			onChangeTapState: (tapState) => { this.setManagedState({tapState}) },
			onFocus: (state) => { this.setState({focused: true}) },
			onBlur: (state) => { this.setState({focused: false}) }
		}, React.DOM.div({style: this.styles.root}, this.props.children))
	}
}

export default Link
