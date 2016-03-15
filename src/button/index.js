import React from 'react'

import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import FocusableTappable from '../focusableTappable'

const tapStateType = React.PropTypes.oneOf('initial', 'hovered', 'pressed')

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
		 * using Tab key, but not on click or touch.
		 **/
		preventFocusOnTap: React.PropTypes.bool,

		/**
		 * Properties that allow you to control button's tap state from the outside.
		 * If they are not present, button will manage tap state inside its
		 * internal state.
		 */
		initialTapState: tapStateType,
		tapState: tapStateType,
		onChangeTapState: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	constructor() {
		super()
		this.initManagedState(['tapState'])
		this.state = {tapState: 'initial'}
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
			onChangeTapState: ({hovered, pressed}) => {
				this.setManagedState({
					tapState: pressed ? 'active' : (hovered ? 'hovered' : 'initial')
				})
			},
			onFocus: () => { this.setManagedState({focused: true}) },
			onBlur: () => { this.setManagedState({focused: false}) }
		}, this.renderContainer())
	}
}

export default Button
