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
 */
@mixinDecorator(StylesMixin, ManagedStateMixin)
class Layer extends React.Component {
	static displayName = 'ZContextLayer'

	static propTypes = {
		type: React.PropTypes.oneOf(LAYER_TYPES),
		global: React.PropTypes.bool,
		closeOnEsc: React.PropTypes.bool,
		overlay: React.PropTypes.bool,
		closeOnOverlayClick: React.PropTypes.bool,
		onRender: React.PropTypes.func
	}

	static defaultProps = {
		type: 'popup',
		global: false,
		closeOnEsc: true,
		overlay: false,
		closeOnOverlayClick: false
	}

	static styles = {
		overlay: {
			position: 'fixed',
			height: '100%',
			width: '100%',
			webkitTapHighlightColor: 'rgba(0,0,0,0)'
		}
	}

	componentDidMount() { this.setLayer() }
	componentDidUpdate() { this.setLayer() }
	componentWillUnmount() { this.close() }

	setLayer() {
		if (this.state.open) {
			if (!this.layerKey) this.open()
			else this.update()
		} else {
			if (this.layerKey) this.close()
		}
	}

	render() {
		return React.DOM.noscript({ref: 'placeholder'})
	}

	createContent() {
		return React.DOM.div(null,
			//{className: this.buildOwnClassName('zContext', 'content')},
			this.props.children)
	}

	createOverlay() {
		let props = {style: this.styles.overlay}
		if (this.props.closeOnOverlayClick) {
			props.onClick = () => { this.setManagedState({open: false}) }
		}
		return React.DOM.div(props)
	}

	open() {
		let content = this.createContent()
		let elem = this.props.global ? null : ReactDOM.findDOMNode(this.refs.placeholder)

		if (this.props.overlay) {
			this.overlayLayerKey = ZContext.addLayer(
				elem,
				this.props.type,
				this.createOverlay()
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
				if (event.keyCode === 27) this.setManagedState({open: false}) // TODO keycodes
			}
			$(document).bind('keydown', this.listener)
		}
	}

	update() {
		// TODO handle change of the overlay property
		ZContext.updateLayer(this.layerKey, this.createContent(),
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
}

export default Layer
