import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import _ from 'underscore'
import assert from 'assert'
import testUtils from 'react-addons-test-utils'

import ZContext, {ZContextLayer, ZContextLayerView} from '../index'

describe('zContext/layer', function() {
	let container

	beforeEach(function() {
		container = $('<div>').appendTo('body')
	})

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container[0])
		container.remove()
	})

	class LayerPage extends React.Component {
		render() {
			return (
				<ZContext>
					<ZContextLayer open={true}>{this.props.children}</ZContextLayer>
				</ZContext>
			)
		}
	}

	it('renders content on ZContext layer', function() {
		let CONTENT = 'content'
		let page = React.createElement(LayerPage, null, React.DOM.div(null, CONTENT))
		ReactDOM.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let popup = _.find(layers, (layer) => layer.props.type === 'popup')

		assert(popup)
		assert.equal(ReactDOM.findDOMNode(popup).innerText, CONTENT)
	})

	it('updates popup content', function() {
		let page = React.createElement(LayerPage, null, React.DOM.div(null, 'content'))
		ReactDOM.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')

		let pageUpdate = React.createElement(LayerPage, null, React.DOM.div(null, 'updated'))
		ReactDOM.render(pageUpdate, container[0])

		assert.equal(ReactDOM.findDOMNode(layer).innerText, 'updated')
	})

	it('opens popup in parent context', function() {
		let innerElem = React.createElement(ZContextLayer, {open: true}, 'inner')
		let outerElem = React.createElement(ZContextLayer, {
			type: 'modal', open: true
		}, innerElem)
		let page = React.createElement(ZContext, null, outerElem)
		ReactDOM.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let inner = _.find(layers, (layer) => layer.props.type === 'popup')
		let outer = _.find(layers, (layer) => layer.props.type === 'modal')

		assert.equal(ReactDOM.findDOMNode(inner).style.zIndex, 2)
		assert.equal(ReactDOM.findDOMNode(outer).style.zIndex, 1)
	})

	it('opens popup in global context when global is true', function() {
		let innerElem = React.createElement(ZContextLayer, {
			global: true, open: true
		}, 'inner')
		let outerElem = React.createElement(ZContextLayer, {
			type: 'modal', open: true
		}, innerElem)
		let page = React.createElement(ZContext, null, outerElem)
		ReactDOM.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContextLayerView)
		let inner = _.find(layers, (layer) => layer.props.type === 'popup')
		let outer = _.find(layers, (layer) => layer.props.type === 'modal')

		assert.equal(ReactDOM.findDOMNode(inner).style.zIndex, 1)
		assert.equal(ReactDOM.findDOMNode(outer).style.zIndex, 2)
	})

	xit('closes popup when mod open is false', function() {
	})

	xit('closeOnEsc', function() {
		let page = React.createElement(ZContext, null,
			React.createElement(ZContextLayer, {open: true}, 'test'))
		ReactDOM.render(page, container[0])

		let esc = $.Event('keydown', {keyCode: 27})
		$(document).trigger(esc)

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')

		assert(!layer)
	})

	xit('overlay', function() {
		let layerElem = React.createElement(ZContextLayer, {
			initialMods: {open: true},
			overlay: true,
			closeOnOverlayClick: true
		}, React.DOM.div({className: 'inside-popup'}, 'test'))
		let page = React.createElement(ZContext, null, layerElem)
		ReactDOM.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		assert.equal(layers.length, 3) // initial + overlay + popup

		let overlay = testUtils.findRenderedDOMComponentWithClass(
			ZContext.instance, 'zContext__overlay') // FIXME
		testUtils.Simulate.click(overlay)

		layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		assert.equal(layers.length, 1) // only initial
	})
})
