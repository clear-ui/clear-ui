import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import _ from 'underscore'
import assert from 'assert'
import {mount} from 'enzyme'

import ZContext, {ZContextLayerView} from '../zContext'
import Attachment from './index'

describe('attachment', function() {
	let wrapper, container

	beforeEach(function() {
		container = $('<div>').prependTo('body').css({
			position: 'absolute', top: 0
		})
	})

	afterEach(function() {
		if (wrapper) wrapper.unmount()
		container.remove()
	})

	const winHeight = $(window).height()

	const TOP = Math.round(winHeight * 0.1)
	const HEIGHT = Math.round(winHeight * 0.2)

	let targetStyle = {
		background: '#eee',
		width: 100,
		height: HEIGHT,
		position: 'absolute',
		top: TOP,
		left: 100
	}
	let target = <div style={targetStyle}>target</div>

	let elementStyle = {width: 100, height: winHeight * 0.5, background: '#ccc'}
	let element = <div className='element' style={elementStyle}>element</div>

	it('renders element in Layer and attaches it to target', function() {
		wrapper = mount(<ZContext>
			<Attachment
				attachment={{
					target: 'center bottom',
					element: 'center top'
				}}
				open={true}
				element={element}
			>
				{target}
			</Attachment>
		</ZContext>, {attachTo: container[0]})

		let layers = wrapper
			.find(ZContextLayerView)
			.filterWhere((layer) => { return layer.props().type === 'popup' })
		assert(layers.get(0))

		let elem = $(ReactDOM.findDOMNode(layers.get(0))).find('.element')
		assert.equal(elem.length, 1)
		assert.equal(elem.text(), 'element')
		assert.equal(elem.css('top'), TOP + HEIGHT + 'px')
	})

	xit('passes popupOptions to Popup', function() {
		//TODO test merging onRender
	})

	xit('updates content and position', function() {
	})

})
