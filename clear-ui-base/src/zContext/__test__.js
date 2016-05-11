import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import $ from 'jquery'
import assert from 'assert'
import sinon from 'sinon'
import {mount} from 'enzyme'

import ZContext, {ZContextLayer, ZContextLayerView} from './index.js'

describe('zContext', function() {
	let wrapper

	afterEach(function() {
		if (wrapper) wrapper.unmount()
	})

	it('renders layer', function() {
		// render layer
		let CONTENT = 'content'
		wrapper = mount(<ZContext>
			<ZContextLayer open={true}>{CONTENT}</ZContextLayer>
		</ZContext>)

		// rendered layer element
		let popup = wrapper
			.find(ZContextLayerView)
			.filterWhere((layer) => { return layer.props().type === 'popup' })
		assert(popup.get(0))
		assert.equal(popup.text(), CONTENT)
	})

	it('render layers in order', function() {
		// render modal > fixed > popup
		wrapper = mount(<ZContext>
			<ZContextLayer open={true} type='modal'>modal</ZContextLayer>
			<ZContextLayer open={true} type='fixed'>fixed</ZContextLayer>
			<ZContextLayer open={true} type='popup'>popup</ZContextLayer>
		</ZContext>)

		// rendered initial > popup > fixed > modal
		let layers = wrapper.find(ZContextLayerView)
		assert.equal(layers.at(0).props().type, 'initial')
		assert.equal(layers.at(1).props().type, 'popup')
		assert.equal(layers.at(2).props().type, 'fixed')
		assert.equal(layers.at(3).props().type, 'modal')
	})

	it('renders layers in the context of other layer', function() {
		// render modal with popup and fixed inside
		wrapper = mount(<ZContext>
			<ZContextLayer open={true} type='modal'>
				modal
				<ZContextLayer open={true} type='fixed'>fixed</ZContextLayer>
				<ZContextLayer open={true} type='popup'>popup</ZContextLayer>
			</ZContextLayer>
		</ZContext>)

		// rendered modal > popup > fixed
		let layers = wrapper.find(ZContextLayerView)
		assert.equal(layers.at(0).props().type, 'initial')
		assert.equal(layers.at(1).props().type, 'modal')
		assert.equal(layers.at(2).props().type, 'popup')
		assert.equal(layers.at(3).props().type, 'fixed')
	})

	it('updates layer content', function() {
		const CONTENT = 'content'
		const NEW_CONTENT = 'new content'

		function Test(props) {
			return <ZContext>
				<ZContextLayer open={true}>{props.children}</ZContextLayer>
			</ZContext>
		}

		// render layer
		wrapper = mount(<Test>{CONTENT}</Test>)

		// change content
		wrapper.setProps({children: NEW_CONTENT})

		// rendered new content
		let popup = wrapper
			.find(ZContextLayerView)
			.filterWhere((layer) => { return layer.props().type === 'popup' })
		assert.equal(popup.text(), NEW_CONTENT)
	})

	it('renders overlay', function() {
		const CONTENT = 'content'

		// render layer with overlay
		wrapper = mount(<ZContext>
			<ZContextLayer open={true} overlay={true}>{CONTENT}</ZContextLayer>
		</ZContext>)

		// rendered initial > overlay > layer
		let layers = wrapper.find(ZContextLayerView)
		let overlay = layers.at(1)
		let popup = layers.at(2)
		assert.equal(overlay.props().type, 'popup')
		assert.equal(popup.props().type, 'popup')
		assert.equal(popup.text(), CONTENT)
	})

	it('closes layer when open is false', function() {
		function Test(props) {
			return <ZContext>
				<ZContextLayer open={props.open}>layer</ZContextLayer>
			</ZContext>
		}

		// render layer
		wrapper = mount(<Test open={true}/>)

		// set open false
		wrapper.setProps({open: false})

		// layer is not rendered
		let popup = wrapper
			.find(ZContextLayerView)
			.filterWhere((layer) => { return layer.props().type === 'popup' })
		assert(!popup.get(0))
	})

	it('requests to close layer with closeOnEsc on esc press', function() {
		// render layer
		let spy = sinon.spy()
		wrapper = mount(<ZContext>
			<ZContextLayer open={true} onClose={spy}>popup</ZContextLayer>
		</ZContext>)

		// trigger esc
		let esc = $.Event('keydown', {keyCode: 27})
		$(document).trigger(esc)

		// onClose was called
		assert(spy.calledOnce)
	})

	it('requests to close layer with closeOnOverlayClick on overlay click', function() {
		// render layer with overlay
		let spy = sinon.spy()
		wrapper = mount(<ZContext>
			<ZContextLayer
				open={true} onClose={spy}
				overlay={true} closeOnOverlayClick={true}
			>
				popup
			</ZContextLayer>
		</ZContext>)

		// click on overlay
		let overlay = wrapper.find(ZContextLayerView).at(1)
		overlay.children().simulate('click')

		assert(spy.calledOnce)
	})
})
