import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'

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

		/** Handler of focusing the element. */
		onFocus: React.PropTypes.func,

		/** Handler of removing focus from the element. */
		onBlur: React.PropTypes.func,

		/** HTML `tabIndex` attribute. */
		tabIndex: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),

		/**
		 * If `true`, element will became focused when you navigate to it
		 * using `Tab` key, but not on click or touch.
		 **/
		preventFocusOnTap: React.PropTypes.bool
	}

	static defaultProps = {
		tabIndex: 0
	}

	constructor(props) {
		super(props)
		this.bindMethods('onFocus', 'onBlur', 'onKeyDown')
	}

	componentDidMount() {
		this.setPropsWithJqueryIfNeeded(this.props.children)
	}

	componentDidUpdate() {
		this.setPropsWithJqueryIfNeeded(this.props.children)
	}

	// Sets props with jquery when elem is not DOM-component and thus may not
	// support needed properties.
	setPropsWithJqueryIfNeeded(elem) {
		if (typeof elem.type === 'string') return

		let domElem = ReactDOM.findDOMNode(this.elemRef)
		if (this.domElem !== domElem) {
			this.domElem = domElem
			$(domElem)
				.focus(this.onFocus)
				.blur(this.onBlur)
				.keydown(this.onKeyDown)
				.attr('tabindex', this.props.tabIndex)
		}
	}

	render() {
		if (this.props.disabled) {
			return this.props.children
		} else {
			let elem = this.props.children
			if (this.props.tabIndex !== undefined) {
				if (typeof elem.type === 'string') {
					elem = cloneElementWithHandlers(elem, {
						onFocus: this.onFocus,
						onBlur: this.onBlur,
						onKeyDown: this.onKeyDown,
						tabIndex: this.props.tabIndex
					})
				}
				elem = cloneReferencedElement(elem, {
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
		ReactDOM.findDOMNode(this.elemRef).focus()
	}
}
