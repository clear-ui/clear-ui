import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

import ZContext from './zContext.js'
import LayerView from './layerView.js'
import LAYER_TYPES from './layerTypes.js'

/** Renders content on separate layer using ZContext. */
@mixin(StylesMixin)
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

		/** Function that is called when layer is rendered on the page. */
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
			if (!this.layerId) this.open()
			else this.update()
		} else {
			if (this.layerId) this.close()
		}
	}

	createLayerView() {
		return <LayerView type={this.props.type}>{this.props.children}</LayerView>
	}

	createOverlayLayerView() {
		let props = {style: this.styles.overlay}
		if (this.props.closeOnOverlayClick) {
			props.onClick = this.onClose.bind(this)
		}
		let overlay = <div {...props}/>
		return <LayerView type={this.props.type}>{overlay}</LayerView>
	}

	open() {
		let elem = this.props.global ? null : ReactDOM.findDOMNode(this.refs.placeholder)

		if (this.props.overlay) {
			this.overlayLayerId = ZContext.addLayer(elem, this.createOverlayLayerView())
		}

		this.layerId = ZContext.addLayer(elem, this.createLayerView(), this.props.onRender)

		if (this.props.closeOnEsc) {
			this.listener = (event) => {
				if (event.keyCode === 27) this.onClose() // TODO keycodes
			}
			$(document).bind('keydown', this.listener)
		}
	}

	update() {
		// TODO handle change of the overlay property
		ZContext.updateLayer(this.layerId, this.createLayerView(), this.props.onRender)
	}

	close() {
		if (this.listener) $(document).unbind('keydown', this.listener)
		if (ZContext.instance) {
			ZContext.removeLayer(this.layerId)
			ZContext.removeLayer(this.overlayLayerId)
		}
		this.layerId = undefined
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
	}
}
