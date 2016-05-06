import assert from 'assert'
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import $ from 'jquery'
import testUtils from 'react-addons-test-utils'

import ZContext, {ZContextLayerView} from '../index'

describe('zContext', function() {
	let container

	beforeEach(() => {
		container = $('<div>').appendTo('body')
		ReactDOM.render(React.createElement(ZContext), container[0])
	})

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container[0])
		container.remove()
	})

	it('opens layer', function() {
		let CONTENT = 'popup content'
		ZContext.addLayer(null, <ZContextLayerView type='popup'>{CONTENT}</ZContextLayerView>)
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		assert.equal(layers.length, 2)
		let popup = layers[1]
		assert.equal(popup.props.type, 'popup')
		assert.equal(React.findDOMNode(popup).innerHTML, CONTENT)
	})

	it('places layers in right order', function() {
		ZContext.addLayer(null, <ZContextLayerView type='modal'>modal</ZContextLayerView>)
		ZContext.addLayer(null, <ZContextLayerView type='fixed'>fixed</ZContextLayerView>)
		ZContext.addLayer(null, <ZContextLayerView type='popup'>popup</ZContextLayerView>)
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let popup = _.find(layers, (layer) => layer.props.type === 'popup')
		let fixed = _.find(layers, (layer) => layer.props.type === 'fixed')
		let modal = _.find(layers, (layer) => layer.props.type === 'modal')
		assert.equal(ReactDOM.findDOMNode(popup).style.zIndex, 1)
		assert.equal(ReactDOM.findDOMNode(fixed).style.zIndex, 2)
		assert.equal(ReactDOM.findDOMNode(modal).style.zIndex, 3)
	})

	it('opens layer in the context of another layer', function() {
		// modal
		//  + popup
		//  + fixed
		ZContext.addLayer(null, 'modal', 'modal')
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let modal = _.find(layers, (layer) => layer.props.type === 'modal')

		ZContext.addLayer(ReactDOM.findDOMNode(modal),
			<ZContextLayerView type='fixed'>fixed</ZContextLayerView>)
		ZContext.addLayer(ReactDOM.findDOMNode(modal),
			<ZContextLayerView type='fixed'>popup</ZContextLayerView>)
		layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let popup = _.find(layers, (layer) => layer.props.type === 'popup')
		let fixed = _.find(layers, (layer) => layer.props.type === 'fixed')

		assert.equal(ReactDOM.findDOMNode(modal).style.zIndex, 1)
		assert.equal(ReactDOM.findDOMNode(popup).style.zIndex, 2)
		assert.equal(ReactDOM.findDOMNode(fixed).style.zIndex, 3)
	})

	it('updates layer', function() {
		let id = ZContext.addLayer(null, <ZContextLayerView type='popup'>popup</ZContextLayerView>)
		ZContext.updateLayer(id, <ZContextLayerView type='popup'>updated</ZContextLayerView>)

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')
		assert.equal(ReactDOM.findDOMNode(layer).innerHTML, 'updated')
	})

	it('removes layer', function() {
		let id = ZContext.addLayer(null, <ZContextLayerView type='popup'>popup</ZContextLayerView>)
		ZContext.removeLayer(id)

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')
		assert(!layer)
	})
})
