import React from 'react'
import update from 'react-addons-update'
import $ from 'jquery'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

/**
 * Layers are sorted by priority. Priority determines order of layers
 * in the same parent. Layer with higher priority will have higher z-index.
 * Also every layer can be a parent context for layers with lower priority.
 */
import LAYER_TYPES from './layerTypes'

import LayerView, {LAYER_ATTR_NAME} from './layerView.js'

/**
 * Manager of vertical context layers. It helps to avoid conflicts of z-indexes.
 * It must be rendered on the page only once at the top context.
 * Static methods to add layers become available after block is rendered.
 */
@mixin(StylesMixin)
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
				id: this.getNextId(),
				elem: <LayerView type='initial'>{this.props.children}</LayerView>
			}]
		}
		this._state = this.state
	}

	componentWillMount() {
		if (ZContext.instance) throw new Error('Page can have only one "ZContext"')
		ZContext.instance = this
	}

	componentWillReceiveProps(nextProps) {
		// Update initial layer
		let layer = <LayerView type='initial'>{nextProps.children}</LayerView>
		this._setState({
			layers: update(this._state.layers, {
				0: {elem: {$set: layer}}
			})
		})
	}

	componentWillUnmount() {
		ZContext.instance = undefined
	}

	render() {
		let layers = this.state.layers.map(function(item, index) {
			return React.cloneElement(item.elem, {
				index,
				id: item.id,
				key: item.id
			})
		})
		return <div style={this.styles.root}>{layers}</div>
	}

	getNextId() {
		this.uid++
		return 'layer-' + this.uid
	}

	// It correctly handles multiple sequential updates.
	// Code should read from 'this._state' instead of 'this.state'.
	_setState(newState, callback) {
		Object.assign(this._state, newState)
		this.setState(this._state, callback)
	}

	addLayerToIndex(index, layer, onRender) {
		let id = this.getNextId()
		let item = {id, elem: layer}
		this._setState({
			layers: update(this._state.layers, {
				$splice: [[index, 0, item]]
			})
		}, onRender)
		return id
	}

	/**
	 * Creates new layer.
	 * @param {DOMElement|false} [elem] - Element that is used to find closest parent layer.
	 *   If `false`, layer will be added to the initial layer.
	 * @param {LayerView} layer - Added layer.
	 * @param {function} onRender - Function that is called after layer is rendered.
	 *
	 * @return {string} Layer id.
	 */
	addLayer(elem, layer, onRender) {
		let layers = this._state.layers
		let priority = this.getTypePriority(layer.props.type)

		// Start from element's layer or from initial layer
		let startIndex
		if (elem) {
			let id = this.getElemLayer(elem)
			startIndex = this.getLayerIndex(id)
		} else {
			startIndex = 0
		}

		let index
		// Skip all layers with priority lower than or equal to
		// the priority of the added layer.
		for (index = startIndex; index < layers.length; index++) {
			let nextLayer = layers[index + 1]
			if (!nextLayer) break
			if (priority < this.getTypePriority(nextLayer.elem.props.type)) break
		}

		return this.addLayerToIndex(index + 1, layer, onRender)
	}

	/**
	 * Updates layer.
	 * @param {string} id - Layer id.
	 * @param {object} layer - New layer.
	 * @param {function} onRender - Function that is called after layer is rendered.
	 */
	updateLayer(id, layer, onRender) {
		let updateFn = (item) => {
			if (item.id === id) return {id, elem: layer}
			else return item
		}
		this._setState({layers: this._state.layers.map(updateFn)}, onRender)
	}

	/**
	 * Removes layer by id.
	 * @param {string} id - Layer id.
	 */
	removeLayer(id) {
		let searchFn = (item) => { return item.id !== id }
		this._setState({layers: this._state.layers.filter(searchFn)})
	}

	getTypePriority(type) {
		let priority = LAYER_TYPES.indexOf(type)
		if (priority === -1) throw new Error(`Unknown layer type: "${type}"`)
		return priority
	}

	getElemLayer(elem) {
		return $(elem).closest(`[${LAYER_ATTR_NAME}]`).attr('data-id')
	}

	getLayerIndex(id) {
		let layers = this._state.layers
		for (let i = 0; i < layers.length; i++) {
			if (layers[i].id === id) return i
		}
	}
}

// Add static methods that proxy calls to the currently mounted instance
let methods = [
	'addLayer',
	'updateLayer',
	'removeLayer'
]

methods.forEach(function(name) {
	ZContext[name] = function(...args) {
		let instance = ZContext.instance
		if (!instance) {
			throw new Error('You can\'t use methods without "ZContext" on page')
		}
		return instance[name](...args)
	}
})

export default ZContext
