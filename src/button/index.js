import React from 'react'

import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import FocusableTappable from '../focusableTappable'

/**
 * Base button component.
 *
 * It allows to handle taps and display button states
 * consistently across different input methods - touch, mouse or keyboard.
 */
@mixinDecorator(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
class Button extends React.Component {
	static propTypes = {
		/**
		 * Handler of the tap event.
		 * It can be triggered with either mouse, touch,
		 * or with pressing Enter key on the focused button.
		 */
		onTap: React.PropTypes.func,

		/** Disabled state of the button. */
		disabled: React.PropTypes.bool,

		/** HTML tabIndex attribute. */
		tabIndex: React.PropTypes.any,

		/**
		 * If true, button will became focused when you navigate to it
		 * using Tab key, but not when click or touch.
		 **/
		preventFocusOnTap: React.PropTypes.bool
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	renderContainer() {
		let label = React.DOM.div({
			key: 'label',
			style: this.styles.label
		}, this.props.children)

		let elemType = this.props.tabIndex === undefined ? 'div' : 'button'
		return React.DOM[elemType]({
			style: this.styles.root,
			disabled: this.props.disabled
		}, label)
	}

	render() {
		return React.createElement(FocusableTappable, {
			disabled: this.props.disabled,
			tabIndex: this.props.tabIndex,
			onTap: this.props.onTap,
			preventFocusOnTap: true,
			onChangeState: (state) => { this.setManagedState({state}) },
			onFocus: () => { this.setManagedState({focused: true}) },
			onBlur: () => { this.setManagedState({focused: false}) }
		}, this.renderContainer())
	}
}

export default Button
