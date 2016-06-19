import React from 'react'
import $ from 'jquery'
import {Motion, spring} from 'react-motion'

import {ZContextLayer} from '../zContext'
import getScrollbarWidth from '../utils/getScrollbarWidth'
import FocusScope from '../utils/focusScope'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import Animation from '../animation'
import {slide, scale, fade} from '../animation/functions'

const scrollbarWidth = getScrollbarWidth()

@mixin(StylesMixin, ChildComponentsMixin)
export default class Modal extends React.Component {
	static displayName = 'Modal'

	static propTypes = {
		/** Controls whether modal is opened or not. */
		open: React.PropTypes.bool,

		/**
		 * Function that is called when modal requests close after clicking outside
		 * or pressing `Esc` key.
		 */
		onClose: React.PropTypes.bool,

		closeOnEsc: React.PropTypes.bool,

		closeOnClickOutside: React.PropTypes.bool,

		closeOnClick: React.PropTypes.bool,

		/** Width of the modal (value of the CSS-property width). */
		width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),

		/**
		 * Type of opening and closing animation.
		 * Possible values: 'fade', 'scale', 'slideDown', or false for no animation.
		 */
		animation: React.PropTypes.oneOf(['fade', 'scale', 'slideDown'])
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
			WebkitOverflowScrolling: 'touch',
			willChange: 'opacity'
		}

		let modal = {
			position: 'absolute',
			userSelect: 'text',
			willChange: 'left, top, transform'
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

	componentDidMount() {
		if (this.props.open) this.open()
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.open && nextProps.open) this.open()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.open && !this.props.open) this.close()
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
			ref: (ref) => { this.rootElemRef = ref }
		}, modal)

		let layer = React.createElement(ZContextLayer, {
			type: 'modal',
			closeOnEsc: this.props.closeOnEsc,
			open: this.props.open,
			onClose: this.onClose.bind(this),
			onRender: this.onRender.bind(this)
		}, root)

		if (this.props.animation) {
			let motion = React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {
					progress: spring(this.props.open ? 1 : 0, {stiffness: 320, damping: 30})
				},
				onRest: () => {
					// end close animation
					if (!this.props.open) this.setState({showLayer: false})
				}
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

				return React.createElement(
					Animation,
					{fn: fade, progress: value.progress},
					React.cloneElement(root, {
						style: {
							...root.props.style,
							overflow: isClosing ? 'hidden' : 'auto'
						}
					}, modalAnimation)
				)
			})

			return React.cloneElement(layer, {
				open: this.state.showLayer
			}, motion)
		} else {
			return layer
		}
	}

	// TODO rename (render window?)
	renderModal() {
		return React.DOM.div({style: this.styles.modal}, this.props.children)
	}

	onClick(event) {
		if (this.props.closeOnClickOutside) {
			if (event.target === this.rootElemRef) this.onClose()
		} else if (this.props.closeOnClick) {
			if ($(event.target).closest(this.modalRef).length) {
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
		this.setPosition()
		if (this.props.open && !this.focusScope) {
			this.focusScope = new FocusScope(this.modalRef)
		}
	}

	open() {
		this.setState({showLayer: true})
		$('body').css({
			overflow: 'hidden',
			paddingRight: this.doesPageHasScroll() ? scrollbarWidth : ''
		})
		this.resizeListener = this.setPosition.bind(this)
		$(window).bind('resize scroll', this.resizeListener)
	}

	close() {
		$('body').css({overflow: '', paddingRight: ''})
		if (this.resizeListener) $(window).unbind('resize scroll', this.resizeListener)
		if (this.focusScope) {
			this.focusScope.destroy()
			this.focusScope = undefined
		}
	}

	setPosition() {
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
