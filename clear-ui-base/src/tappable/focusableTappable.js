import React from 'react'

import mixin from '../utils/mixin/decorator'
import BindMethodsMixin from '../utils/bindMethodsMixin'
import keyCodes from '../utils/keyCodes'
import cloneElementWithHandlers from '../utils/cloneElementWithHandlers'
import cloneReferencedElement from '../utils/cloneReferencedElement.js'
import Tappable from './tappable'

/** Tappable that supports focusing and pressing with Enter button. */
@mixin(BindMethodsMixin)
export default class FocusableTappable extends React.Component {
	static displayName = 'FocusableTappable'

	static propTypes = {
		...Tappable.propTypes,
		onFocus: React.PropTypes.func,
		onBlur: React.PropTypes.func,
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
		preventFocusOnTap: React.PropTypes.bool
	}

	static defaultProps = {
		tabIndex: 0
	}

	constructor(props) {
		super(props)
		this.bindMethods('onFocus', 'onBlur', 'onKeyDown')
	}

	render() {
		if (this.props.disabled) {
			return this.props.children
		} else {
			let elem = this.props.children
			if (this.props.tabIndex !== undefined) {
				elem = cloneElementWithHandlers(elem, {
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					onKeyDown: this.onKeyDown
				})
				elem = cloneReferencedElement(elem, {
					tabIndex: this.props.tabIndex,
					ref: (ref) => { this.elemRef = ref }
				})
			}
			return React.createElement(Tappable, {
				onChangeTapState: ({hovered, pressed}) => {
					this.hovered = hovered
					this.pressed = pressed
					this.onChangeTapState()
					if (this.props.preventFocusOnTap && this.pressed) {
						this.preventFocus = true
						setTimeout(() => { this.preventFocus = false })
					}
				},
				onTap: this.props.onTap,
				onTapStart: this.props.onTapStart,
				onTapEnd: this.props.onTapEnd
			}, elem)
		}
	}

	onFocus(event) {
		if (this.preventFocus) {
			event.preventDefault()
		} else {
			this.isFocused = true
			if (this.props.onFocus) this.props.onFocus(event)
		}
	}

	onBlur(event) {
		this.isFocused = false
		if (this.props.onBlur) this.props.onBlur(event)
	}

	onKeyDown(event) {
		if (this.isFocused && event.keyCode === keyCodes.ENTER) {
			this.pressed = true
			this.onChangeTapState()
			if (this.props.onTapStart) this.props.onTapStart()

			if (this.props.onTap) this.props.onTap()

			setTimeout(() => {
				this.pressed = false
				this.onChangeTapState()
				if (this.props.onTapEnd) this.props.onTapEnd()
			}, 150)
		}
	}

	onChangeTapState() {
		if (this.props.onChangeTapState) {
			this.props.onChangeTapState({pressed: this.pressed, hovered: this.hovered})
		}
	}

	focus() {
		this.elemRef.focus()
	}
}
