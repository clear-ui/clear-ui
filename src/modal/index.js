import React from 'react'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import ZContext from '../zContext'
import getScrollbarWidth from '../utils/getScrollbarWidth'
import FocusScope from '../utils/focusScope'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import Animation, {slide, scale, fade} from '../animations'

// const SUPPORTS_TRANSFORM = 'transform' in document.body.style
const scrollbarWidth = getScrollbarWidth()


@mixinDecorator(StylesMixin, ChildComponentsMixin)
class Modal extends React.Component {
	static propTypes = {
		/** Width of the modal (value of the CSS-property width). */

		/** TODO */
		alignTop: React.PropTypes.bool,

		/** Default: true */
		closeOnClickOutside: React.PropTypes.bool,

		/** Default: true */
		closeOnClick: React.PropTypes.bool,

		/** Default: 'fade' */
		animation: React.PropTypes.oneOf('fade', 'scale', 'slideDown')
	}

	static defaultProps = {
		closeOnClickOutside: true,
		closeOnEsc: true,
		animation: 'fade'
	}

	static styles = (props) => {
		let root = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			overflow: 'auto',
			WebkitOverflowScrolling: 'touch'
		}

		let modal = {
			position: 'absolute',
			userSelect: 'text'
		}
		if (props.width) modal.width = props.width

		return {root, modal}
	}

	static childComponents = {
		animation: (props) => {
			if (props.animation === 'slideDown') {
				return React.createElement(Animation, {
					fn: slide,
					params: {side: 'bottom', distance: 64}
				})
			}
			if (props.animation === 'scale') {
				return React.createElement(Animation, {
					fn: scale,
					params: {initialScale: 0.5, origin: 'top center'}
				})
			}
		}
	}

	componentDidUpdate() {
		if (!this.state.open) this.close()
	}

	componentWillUnmount() {
		this.close()
	}

	render() {
		let modal = React.cloneElement(this.renderModal(), {
			ref: (ref) => { this.modalRef = ref }
		})

		let root = React.DOM.div({
			onClick: this.onClick.bind(this),
			style: this.styles.root,
			ref: (ref) => { this.elemRef = ref }
		}, modal)

		let layer = React.createElement(ZContext.Layer, {
			type: 'modal',
			closeOnEsc: this.props.closeOnEsc,
			open: this.props.open,
			onClose: this.onClose.bind(this),
			onRender: this.onRender.bind(this)
		}, root)

		if (this.props.animation) {
			return React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(this.props.open ? 1 : 0, [320, 30])}
			}, (value) => {
				let isClosing = !this.props.open && value.progress !== 0

				let animatedModal = React.cloneElement(modal, {
					style: {
						...modal.props.style,
						marginLeft: (isClosing && this.doesPageHasScroll()) ?
							Math.round(scrollbarWidth / 2) : 0
					}
				})

				let modalAnimation = this.props.animation === 'fade' ?
					animatedModal :
					React.cloneElement(
						this.getChildComponent('animation'),
						{progress: value.progress},
						animatedModal
					)

				let rootAnimation = React.createElement(
					Animation,
					{fn: fade, progress: value.progress},
					React.cloneElement(root, {
						style: {
							...root.props.style,
							overflow: isClosing ? 'hidden' : 'auto'
						}
					}, modalAnimation)
				)

				return React.cloneElement(layer, {
					open: this.state.open || value.progress !== 0
				}, rootAnimation)
			})
		} else {
			return layer
		}
	}

	renderModal() {
		return React.DOM.div({style: this.styles.modal}, this.props.children)
	}

	onClick(event) {
		if (this.props.closeOnClickOutside) {
			if (event.target === this.elemRef) this.onClose()
		} else if (this.props.closeOnClick) {
			if ($(event.target).closest(this.modalRef).length) {
				this.onClose()
			}
		}
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
	}

	doesPageHasScroll() : boolean {
		return document.body.clientWidth < window.innerWidth
	}

	onRender() {
		if (this.props.open && !this.opened) {
			this.opened = true
			$('body').css({
				overflow: 'hidden',
				paddingRight: this.doesPageHasScroll() ? scrollbarWidth : ''
			})
			this.resizeListener = this.setSize.bind(this)
			$(window).bind('resize scroll', this.resizeListener)
			this.focusScope = new FocusScope(this.modalRef)
		}
		this.setSize()
	}

	close() {
		this.opened = false
		$('body').css({overflow: '', paddingRight: ''})
		if (this.resizeListener) $(window).unbind('resize scroll', this.resizeListener)
		if (this.focusScope) this.focusScope.destroy()
	}

	setSize() {
		let modal = $(this.modalRef)
		let position = {}

		let windowHeight = $(window).height()
		let windowWidth = $(window).width()

		let heightWithMargins = modal.outerHeight(true)
		if (heightWithMargins > windowHeight) {
			position.top = 0
		} else {
			position.top = Math.round((windowHeight - heightWithMargins) / 2)
		}

		let width = modal.outerWidth()
		position.left = Math.round((windowWidth - width) / 2)

		modal.css(position)
	}
}

export default Modal
