import assert from 'assert'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import FocusScope from './index'

describe.only('focusScope', function() {
	let container, scope

	beforeEach(function() {
		container = $('<div>').appendTo('body')
	})

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container[0])
		container.remove()
		if (scope) scope.destroy()
	})

	let scoped = (
		<div className='scoped'>
			<input className='inputInside'/>
			<input className='inputInside2'/>
		</div>
	)

	let test = (
		<div>
			{scoped}
			<input className='inputOutside'/>
		</div>
	)

	it('puts focus on first tabbable element', function() {
		ReactDOM.render(test, container[0])
		scope = new FocusScope(container.find('.scoped')[0])
		assert.equal(container.find('.inputInside')[0], document.activeElement)
	})

	it('holds focus inside container', function() {
		ReactDOM.render(test, container[0])
		scope = new FocusScope(container.find('.scoped')[0])

		// return focus from input outside scope
		container.find('.inputOutside').focus()
		assert.equal(container.find('.inputInside')[0], document.activeElement)

		// allow to focus inside scope
		container.find('.inputInside2').focus()
		assert.equal(container.find('.inputInside2')[0], document.activeElement)
	})

	it('restores focus on destroy', function() {
		ReactDOM.render(test, container[0])
		container.find('.inputOutside').focus()
		scope = new FocusScope(container.find('.scoped')[0])
		scope.destroy()
		assert.equal(container.find('.inputOutside')[0], document.activeElement)
	})

	describe('multiple instances', function() {
		let scope1, scope2

		let testMultiple = (
			<div>
				<div className='scoped1'>
					<input className='input1'/>
				</div>
				<div className='scoped2'>
					<input className='input2'/>
				</div>
			</div>
		)

		afterEach(function() {
			if (scope1) scope1.destroy()
			if (scope2) scope2.destroy()
		})

		it('holds focus only for last created instance', function() {
			ReactDOM.render(testMultiple, container[0])
			scope1 = new FocusScope(container.find('.scoped1')[0])
			scope2 = new FocusScope(container.find('.scoped2')[0])
			container.find('.scoped1').find('input').focus()
			assert.equal(container.find('.scoped2').find('input')[0], document.activeElement)
		})

		it('returns focus to previous instance on destroy', function() {
			ReactDOM.render(testMultiple, container[0])
			scope1 = new FocusScope(container.find('.scoped1')[0])
			scope2 = new FocusScope(container.find('.scoped2')[0])
			assert.equal(container.find('.scoped2').find('input')[0], document.activeElement)
			scope2.destroy()
			assert.equal(container.find('.scoped1').find('input')[0], document.activeElement)
		})
	})

})
