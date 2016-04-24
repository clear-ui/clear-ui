import React from 'react'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import FocusableTappable from '../focusableTappable'

/**
 * Base button component.
 *
 * It allows to handle taps and display button states
 * consistently across different input methods - touch, mouse or keyboard.
 */
@mixin(StylesMixin, ManagedStateMixin)
export default class Button extends React.Component {
	static propTypes = {
		/**
		 * Handler of the tap event.
		 * It can be triggered with either mouse, touch,
		 * or with pressing `Enter` key on the focused button.
		 */
		onTap: React.PropTypes.func,

		/** Disabled state of the button. */
		disabled: React.PropTypes.bool,

		/** HTML tabIndex attribute. */
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),

		/**
		 * If true, button will became focused when you navigate to it
		 * using `Tab` key, but not on click or touch.
		 **/
		preventFocusOnTap: React.PropTypes.bool,

		initialTapState: React.PropTypes.oneOf(['initial', 'hovered', 'pressed']),

		/**
		 * Properties that allow you to control button's tap state from the outside.
		 * If they are not present, button will manage tap state inside its
		 * internal state.
		 */
		tapState: React.PropTypes.oneOf(['initial', 'hovered', 'pressed']),

		/**
		 * Function that is called on change button's tap state, when it is
		 * controlled, i.e. prop `tapState` is defined.
		 *
		 * (tapState: string) => void
		 */
		onChangeTapState: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true,
		tabIndex: 0
	}

	constructor() {
		super()
		this.initManagedState(['tapState'])
		this.state = {tapState: 'initial'}
	}

	renderRoot() {
		let label = React.DOM.div({
			key: 'label',
			style: this.styles.label
		}, this.props.children)

		// let elemType = this.props.tabIndex === undefined ? 'div' : 'button'
		let elemType = 'div'
		return React.DOM[elemType]({
			style: this.styles.root,
			disabled: this.props.disabled,
			ref: (ref) => { this.rootRef = ref }
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
		}, this.renderRoot())
	}

	focus() {
		this.rootRef.focus()
	}
}
