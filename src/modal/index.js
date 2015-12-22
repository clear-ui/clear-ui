import React from 'react'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import ZContext from '../zContext'
import getScrollbarWidth from '../utils/getScrollbarWidth'
import FocusScope from '../utils/focusScope'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

const SUPPORTS_TRANSFORM = 'transform' in document.body.style
const scrollbarWidth = getScrollbarWidth()

/*
 * @param {number} props.width
 * @param {boolean} props.alignTop
 * @param {boolean} [props.closeOnOverlayClick=true]
 * @param {boolean} [props.closeOnClick=false]
 * @param {boolean} [props.closeOnEsc=true]
 * @param {boolean} [props.showCloseButton=true]
 * @param {boolean} [props.showOverlay=true]
*/
@mixinDecorator(StylesMixin)
class Modal extends React.Component {
	static defaultProps = {
		closeOnOverlayClick: true,
		closeOnClick: false,
		closeOnEsc: true,
		showOverlay: true,
		showCloseButton: true
	}

	componentDidUpdate() {
		if (!this.state.open) this.close()
	}

	componentWillUnmount() {
		this.close()
	}

	render() {
		return React.createElement(Motion, {
			defaultStyle: {opacity: 0},
			style: {opacity: spring(this.props.open ? 1 : 0)}
		}, (value) => {
			let isClosing = !this.props.open && value.opacity !== 0

			let content = React.DOM.div({
				//className: this.buildOwnClassName('modal', 'content'),
				ref: (ref) => { this.contentRef = ref },
				style: {
					...this.styles.content,
					marginLeft: (isClosing && this.doesPageHasScroll()) ?
						Math.floor(scrollbarWidth / 2) : 0
				}
			}, this.props.children)

			let elem = React.DOM.div({
				onClick: this.onClick.bind(this),
				style: {
					...this.styles.root,
					opacity: value.opacity,
					overflow: isClosing ? 'hidden' : 'auto'
				},
				ref: (ref) => { this.elemRef = ref }
			}, content)

			return React.createElement(ZContext.Layer, {
				type: 'modal',
				closeOnEsc: this.props.closeOnEsc,
				open: this.props.open || value.opacity !== 0,
				onClose: this.onClose.bind(this),
				onRender: this.onRender.bind(this)
			}, elem)
		})
	}

	onClick(event) {
		if (this.props.closeOnOverlayClick) {
			if (event.target === this.elemRef) this.onClose()
		} else if (this.props.closeOnClick) {
			if ($(event.target).closest(this.contentRef).length) {
				this.onClose()
			}
		}
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
	}

	doesPageHasScroll() {
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
			this.focusScope = new FocusScope(this.contentRef)
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
		let content = $(this.contentRef)
		let position = {}

		let windowHeight = $(window).height()
		let windowWidth = $(window).width()

		let heightWithMargins = content.outerHeight(true)
		if (heightWithMargins > windowHeight) {
			position.top = 0
		} else {
			position.top = Math.round((windowHeight - heightWithMargins) / 2)
		}

		let width = content.outerWidth()
		position.left = Math.round((windowWidth - width) / 2)

		content.css(SUPPORTS_TRANSFORM ?
			{
				transform: `translate(${position.left}px, ${position.top}px)`,
				top: 0, left: 0
			} :
			position)
	}
}

export default Modal
