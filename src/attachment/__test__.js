import React from 'react'
import ReactDOM from 'react-dom'
import testUtils from 'react-addons-test-utils'
import $ from 'jquery'
import _ from 'underscore'
import assert from 'assert'

import ZContext from '../zContext'
import Attachment from './index'

describe('attachment', function() {
	var container

	beforeEach(function() {
		container = $('<div>').prependTo('body').css({
			position: 'absolute', top: 0
		})
	})

	afterEach(function() {
		React.unmountComponentAtNode(container[0])
		container.remove()
	})

	let target = React.DOM.div({
		style: {
			background: '#eee',
			width: 100,
			height: 50,
			position: 'absolute',
			top: 100,
			left: 100
		}
	}, 'target')

	let element = React.DOM.div({
		className: 'element',
		style: {width: 100, height: 200, background: '#ccc'}
	}, 'element')

	it('renders element in Layer and attaches it to target', function() {
		let attachment = React.createElement(Attachment, {
			options: {
				attachment: {
					target: 'center bottom',
					element: 'center top'
				}
			},
			mods: {open: true},
			element
		}, target)
		let page = React.createElement(ZContext, null, attachment)
		React.render(page, container[0])

		let layers = testUtils.scryRenderedComponentsWithType(
			ZContext.instance, ZContext.LayerContainer)
		let layer = _.find(layers, (layer) => layer.props.type === 'popup')
		assert(layer)

		let elem = $(ReactDOM.findDOMNode(layer)).find('.element')
		assert.equal(elem.length, 1)
		assert.equal(elem.text(), 'element')
		assert.equal(elem.offset().top, 150)
	})

	xit('passes popupOptions to Popup', function() {
		//TODO test merging onRender
	})

	xit('updates content and position', function() {
	})

})
