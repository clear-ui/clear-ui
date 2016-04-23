import assert from 'assert'
import React from 'react'
import _ from 'underscore'
import $ from 'jquery'
import testUtils from 'react-addons-test-utils'

import ZContext from '../index'

describe('zContext', function() {
	let container

	beforeEach(() => {
		container = $('<div>').appendTo('body')
		React.render(React.createElement(ZContext), container[0])
	})

	afterEach(function() {
		React.unmountComponentAtNode(container[0])
		container.remove()
	})

	it('opens layer', function() {
		let CONTENT = 'popup content'
		ZContext.addLayer(null, 'popup', CONTENT)
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		assert.equal(layers.length, 2)
		let popup = layers[1]
		assert.equal(popup.props.type, 'popup')
		assert.equal(React.findDOMNode(popup).innerHTML, CONTENT)
	})

	it('places layers in right order', function() {
		ZContext.addLayer(null, 'modal', 'modal')
		ZContext.addLayer(null, 'fixed', 'fixed')
		ZContext.addLayer(null, 'popup', 'popup')
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let popup = _.find(layers, (layer) => layer.props.type === 'popup')
		let fixed = _.find(layers, (layer) => layer.props.type === 'fixed')
		let modal = _.find(layers, (layer) => layer.props.type === 'modal')
		assert.equal(React.findDOMNode(popup).style.zIndex, 1)
		assert.equal(React.findDOMNode(fixed).style.zIndex, 2)
		assert.equal(React.findDOMNode(modal).style.zIndex, 3)
	})

	it('opens layer in the context of another layer', function() {
		// modal
		//  + popup
		//  + fixed
		ZContext.addLayer(null, 'modal', 'modal')
		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let modal = _.find(layers, (layer) => layer.props.type === 'modal')

		ZContext.addLayer(React.findDOMNode(modal), 'fixed', 'fixed')
		ZContext.addLayer(React.findDOMNode(modal), 'popup', 'popup')
		layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let popup = _.find(layers, (layer) => layer.props.type === 'popup')
		let fixed = _.find(layers, (layer) => layer.props.type === 'fixed')

		assert.equal(React.findDOMNode(modal).style.zIndex, 1)
		assert.equal(React.findDOMNode(popup).style.zIndex, 2)
		assert.equal(React.findDOMNode(fixed).style.zIndex, 3)
	})

	it('updates layer', function() {
		let key = ZContext.addLayer(null, 'popup', 'popup')
		ZContext.updateLayer(key, 'updated')

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')
		assert.equal(React.findDOMNode(layer).innerHTML, 'updated')
	})

	it('removes layer', function() {
		let key = ZContext.addLayer(null, 'popup', 'popup')
		ZContext.removeLayer(key)

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')
		assert(!layer)
	})
})
