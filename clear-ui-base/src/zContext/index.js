import React from 'react'
import update from 'react-addons-update'
import _ from 'underscore'
import $ from 'jquery'

import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import Layer from './layer'

/**
 * Layers are sorted by priority. Priority determines order of layers
 * in the same parent. Layer with higher priority will have higher z-index.
 * Also every layer can be a parent context for layers with lower priority.
 */
import LAYER_TYPES from './layerTypes'

@mixinDecorator(StylesMixin)
class LayerContainer extends React.Component {
	static displayName = 'ZContextLayerContainer'

	static styles = (props) => {
		let root = {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: props.index
		}

		if (props.type === 'initial') {
			root.position = 'relative'
			root.height = '100%'
		}

		return {root}
	}

	shouldComponentUpdate(nextProps) {
		// This prevents cyclic updates, when something in the layer
		// updates ZContext on its 'didUpdate', e.g. adds new layer.
		let equal = (this.props.children === nextProps.children) &&
			_.isEqual(_.omit(this.props, 'children'), _.omit(nextProps, 'children'))
		return !equal
	}

	render() {
		return React.DOM.div({
			style: this.styles.root,
			'data-key': this.props.layerKey,
			className: 'zContext__layer'
		}, this.props.children)
	}
}

/**
 * Manager of vertical context layers. It helps to avoid conflicts of z-indexes.
 * It must be rendered on the page only once at the top context.
 * Static methods to add layers become available after block is rendered.
 */
@mixinDecorator(StylesMixin)
class ZContext extends React.Component {
	static displayName = 'ZContext'

	static styles = {
		root: {
			height: '100%'
		}
	}

	constructor(props) {
		super(props)
		this.uid = 0
		this.state = {
			layers: [{
				content: this.props.children,
				key: this.makeLayerKey(),
				type: 'initial'
			}]
		}
		this._state = this.state
	}

	// It correctly handles multiple sequential updates.
	// Code should read from 'this._state' instead of 'this.state'.
	_setState(newState, callback) {
		_.extend(this._state, newState)
		this.setState(this._state, callback)
	}

	componentWillMount() {
		if (ZContext.instance) throw new Error('Page can have only one "ZContext"')
		ZContext.instance = this
	}

	componentWillUnmount() {
		ZContext.instance = undefined
	}

	componentWillReceiveProps(nextProps) {
		// Update initial layer
		this._setState({
			layers: update(this._state.layers, {
				0: {content: {$set: nextProps.children}}
			})
		})
	}

	render() {
		let layers = this.state.layers.map(function(layer, index) {
			return React.createElement(LayerContainer, {
				index,
				type: layer.type,
				ref: layer.key,
				key: layer.key,
				layerKey: layer.key
			}, layer.content)
		})
		return React.DOM.div({style: this.styles.root}, layers)
	}

	addLayerToIndex(index, type, content, onRender) {
		let key = this.makeLayerKey()
		let layer = {content, type, key}
		this._setState({
			layers: update(this._state.layers, {
				$splice: [[index, 0, layer]]
			})
		}, onRender)
		return layer.key
	}

	/**
	 * Creates new layer.
	 * @param {DOMElement|false} [elem] - Element that is used to find closest parent layer.
	 *   If elem is `false`, parent will be initial layer.
	 * @param {string} type - Layer type.
	 * @param {object} content - Content of the layer.
	 * @param {function} onRender - Function that is called after layer is rendered.
	 *
	 * @return {string} Layer key.
	 */
	addLayer(elem, type, content, onRender) {
		let layers = this._state.layers
		let priority = this.getPriority(type)

		// Start from element's layer or from initial layer
		let startIndex
		if (elem) {
			let key = this.getElemLayer(elem)
			startIndex = this.getLayerIndex(key)
		} else {
			startIndex = 0
		}

		let index
		// Skip all layers with priority lower than or equal to
		// the priority of the added layer.
		for (index = startIndex; index < layers.length; index++) {
			let nextLayer = layers[index + 1]
			if (!nextLayer) break
			if (priority < this.getPriority(nextLayer.type)) break
		}

		return this.addLayerToIndex(index + 1, type, content, onRender)
	}

	/**
	 * Updates layer.
	 * @param {string} key - Layer key.
	 * @param {object} content - New content of the layer.
	 * @param {function} onRender - Function that is called after layer is rendered.
	 */
	updateLayer(key, content, onRender) {
		let index = this.getLayerIndex(key)
		this._setState({
			layers: update(this._state.layers, {
				[index]: {content: {$set: content}}
			})
		}, onRender)
	}

	/**
	 * Removes layer by key.
	 * @param {string} key - Layer key.
	 */
	removeLayer(key) {
		this._setState({
			layers: this._state.layers.filter((layer) => {
				return layer.key !== key
			})
		})
	}

	makeLayerKey() {
		this.uid++
		return 'layer-' + this.uid
	}

	getPriority(type) {
		let priority = LAYER_TYPES.indexOf(type)
		if (priority === -1) throw new Error(`Unknown layer type: "${type}"`)
		return priority
	}

	getElemLayer(elem) {
		// TODO wtf
		return $(elem).closest('.zContext__layer').attr('data-key')
	}

	getLayerIndex(key) {
		let layers = this._state.layers
		for (let i = 0; i < layers.length; i++) {
			if (layers[i].key === key) return i
		}
	}
}

ZContext.LayerContainer = LayerContainer

// Add static methods that call according methods of the mounted instance
let methods = [
	'addLayer',
	'updateLayer',
	'removeLayer'
]

methods.forEach(function(name) {
	ZContext[name] = function() {
		let instance = ZContext.instance
		if (!instance) {
			throw new Error('You can\'t use methods without "ZContext" on page')
		}
		return instance[name].apply(instance, arguments)
	}
})

ZContext.Layer = Layer

export default ZContext
