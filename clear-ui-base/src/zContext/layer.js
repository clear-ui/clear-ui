import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import ZContext from './index'
import LAYER_TYPES from './layerTypes'

/**
 * Renders content on separate layer using ZContext.
 * @param {string} [props.type='popup'] - ZContext layer type.
 * @param {boolean} [props.global=false]
 * @param {function} [props.onRender] - Function that is called on render content in the layer.
 * @param {boolean} [props.closeOnEsc=true]
 * @param {boolean} [props.overlay=false] - Close page with transparent overlay.
 * @param {boolean} [props.closeOnOverlayClick=false]
 * @param {function} [props.onClose]
 */
@mixinDecorator(StylesMixin, ManagedStateMixin)
export default class ZContextLayer extends React.Component {
	static displayName = 'ZContextLayer'

	static propTypes = {
		/** Controls the visibility of the layer. */
		open: React.PropTypes.bool,

		/**
		 * Layer type. It affects order of layers.
		 *
		 * Possible layer types in order of their priority:
		 * `'initial'`, `'popup'`, `'fixed'`, `'modal'`, `'notify'`.
		 */
		type: React.PropTypes.oneOf(LAYER_TYPES),

		/** When `true`, the layer is rendered as if it is not nested in any other layers. */
		global: React.PropTypes.bool,

		/** Function that is called when the layer requests close. */
		onClose: React.PropTypes.func,

		/** When `true`, the layer will request close on pressing the `Esc` key. */
		closeOnEsc: React.PropTypes.bool,

		/** When `true`, when displaying the layer page is overlapped by transparent overlay */
		overlay: React.PropTypes.bool,

		/** When `true`, the layer will request close on clicking the overlay. */
		closeOnOverlayClick: React.PropTypes.bool,

		/** Function that is called when content is rendered in the layer. */
		onRender: React.PropTypes.func
	}

	static defaultProps = {
		type: 'popup',
		closeOnEsc: true
	}

	static styles = {
		overlay: {
			position: 'fixed',
			height: '100%',
			width: '100%',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)'
		}
	}

	componentDidMount() { this.setLayer() }
	componentDidUpdate() { this.setLayer() }
	componentWillUnmount() { this.close() }

	render() {
		return React.DOM.noscript({ref: 'placeholder'})
	}

	setLayer() {
		if (this.props.open) {
			if (!this.layerKey) this.open()
			else this.update()
		} else {
			if (this.layerKey) this.close()
		}
	}

	renderContent() {
		return React.DOM.div(null,
			//{className: this.buildOwnClassName('zContext', 'content')},
			this.props.children)
	}

	renderOverlay() {
		let props = {style: this.styles.overlay}
		if (this.props.closeOnOverlayClick) {
			props.onClick = this.onClose.bind(this)
		}
		return React.DOM.div(props)
	}

	open() {
		let content = this.renderContent()
		let elem = this.props.global ? null : ReactDOM.findDOMNode(this.refs.placeholder)

		if (this.props.overlay) {
			this.overlayLayerKey = ZContext.addLayer(
				elem,
				this.props.type,
				this.renderOverlay()
			)
		}

		this.layerKey = ZContext.addLayer(
			elem,
			this.props.type,
			content,
			this.props.onRender
		)

		if (this.props.closeOnEsc) {
			this.listener = (event) => {
				if (event.keyCode === 27) this.onClose() // TODO keycodes
			}
			$(document).bind('keydown', this.listener)
		}
	}

	update() {
		// TODO handle change of the overlay property
		ZContext.updateLayer(this.layerKey, this.renderContent(),
			this.props.onRender)
	}

	close() {
		if (this.listener) $(document).unbind('keydown', this.listener)
		if (ZContext.instance) {
			ZContext.removeLayer(this.layerKey)
			ZContext.removeLayer(this.overlayLayerKey)
		}
		this.layerKey = undefined
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
	}
}
