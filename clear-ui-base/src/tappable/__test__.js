import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import assert from 'assert'
import sinon from 'sinon'
import {mount} from 'enzyme'

import Tappable, {FocusableTappable} from './index.js'

describe('tappable', function() {
	let wrapper

	afterEach(function() {
		if (wrapper) wrapper.unmount()
	})

	it('calls events when clicked with mouse', function() {
		let onTap = sinon.spy()
		let onTapStart = sinon.spy()
		let onTapEnd = sinon.spy()
		let onChangeTapState = sinon.spy()

		wrapper = mount(<Tappable
			onTap={onTap}
			onTapStart={onTapStart}
			onTapEnd={onTapEnd}
			onChangeTapState={onChangeTapState}
		>
			<div>test</div>
		</Tappable>)

		let div = wrapper

		// mouseup is jquery event on document, others are react events on div

		div.simulate('mouseEnter')
		assert.equal(onChangeTapState.callCount, 1)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: true, pressed: false})

		div.simulate('mouseDown', {button: 0})
		assert.equal(onChangeTapState.callCount, 2)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: true, pressed: true})
		assert(onTapStart.calledOnce)

		let elem = ReactDOM.findDOMNode(div.get(0))
		$(document).trigger($.Event('mouseup', {target: elem}))
		assert.equal(onChangeTapState.callCount, 3)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: true, pressed: false})
		assert(onTapEnd.calledOnce)
		assert(onTap.calledOnce)

		div.simulate('mouseLeave')
		assert.equal(onChangeTapState.callCount, 4)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: false, pressed: false})
	})

	it('calls events when touched', function() {
		let onTap = sinon.spy()
		let onTapStart = sinon.spy()
		let onTapEnd = sinon.spy()
		let onChangeTapState = sinon.spy()

		wrapper = mount(<Tappable
			onTap={onTap}
			onTapStart={onTapStart}
			onTapEnd={onTapEnd}
			onChangeTapState={onChangeTapState}
		>
			<div>test</div>
		</Tappable>)

		let div = wrapper

		div.simulate('touchStart', {touches: [{}]})
		assert.equal(onChangeTapState.callCount, 1)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: true, pressed: true})
		assert(onTapStart.calledOnce)

		div.simulate('touchEnd')
		assert.equal(onChangeTapState.callCount, 2)
		assert.deepEqual(onChangeTapState.lastCall.args[0], {hovered: false, pressed: false})
		assert(onTapEnd.calledOnce)
		assert(onTap.calledOnce)
	})

	it('does not call events when is disabled', function() {
		let onTap = sinon.spy()
		let onTapStart = sinon.spy()
		let onTapEnd = sinon.spy()
		let onChangeTapState = sinon.spy()

		wrapper = mount(<Tappable
			disabled={true}
			onTap={onTap}
			onTapStart={onTapStart}
			onTapEnd={onTapEnd}
			onChangeTapState={onChangeTapState}
		>
			<div>test</div>
		</Tappable>)

		let div = wrapper
		div.simulate('touchStart', {touches: [{}]})
		div.simulate('touchEnd')

		assert.equal(onTap.callCount, 0)
		assert.equal(onTapStart.callCount, 0)
		assert.equal(onTapEnd.callCount, 0)
		assert.equal(onChangeTapState.callCount, 0)
	})
})

describe('tappable/focusableTappable', function() {
	let wrapper

	afterEach(function() {
		if (wrapper) wrapper.unmount()
	})

	it('calls events when using keyboard', function() {
		let onTap = sinon.spy()
		let onFocus = sinon.spy()
		let onBlur = sinon.spy()

		wrapper = mount(<FocusableTappable
			onTap={onTap}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<div>test</div>
		</FocusableTappable>)

		let div = wrapper

		div.simulate('focus')
		assert(onFocus.calledOnce)

		div.simulate('keyDown', {keyCode: 13})
		assert(onTap.calledOnce)

		div.simulate('blur')
		assert(onBlur.calledOnce)
	})
})
