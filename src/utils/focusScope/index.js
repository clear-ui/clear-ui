import $ from 'jquery'
import findTabbable from '../../../external/findTabbable'

import keyCodes from '../keyCodes'

/**
 * It restricts focus inside element.
 * On destroy it returns focus to the element that was focused before.
 * @param element {DOMElement}
 */
export default class FocusScope {
	constructor(element) {
		this.element = element
		FocusScope.addInstance(this)
	}

	destroy() {
		FocusScope.removeInstance(this)
	}

	checkFocus() {
		if (!this.element.contains(document.activeElement)) this.setFocus()
	}

	setFocus() {
		let tabbable = findTabbable(this.element)
		if (tabbable.length) tabbable[0].focus()
	}

	scopeTab(event) {
		let tabbable = findTabbable(this.element)
		let finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
		if (finalTabbable === document.activeElement) {
			event.preventDefault()
			let target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
			target.focus()
		}
	}

	static instances = []

	static addInstance(inst) {
		this.instances.push(inst)
		if (this.instances.length === 1) {
			this.savedFocus = document.activeElement
			this.bindHandlers()
		}
		inst.setFocus()
	}

	static removeInstance(inst) {
		let index = this.instances.indexOf(inst)
		if (index === -1) return // already removed
		this.instances.splice(index, 1)
		if (this.instances.length === 0) {
			this.unbindHandlers()
			if (this.savedFocus) {
				try {
					// it might be not in the DOM already
					this.savedFocus.focus()
				} catch (ex) {} // eslint-disable-line no-empty
			}
		} else {
			this.getActiveInstance().setFocus()
		}
	}

	static bindHandlers() {
		this.focusHandler = this.handleFocus.bind(this)
		this.keyDownHandler = this.handleKeyDown.bind(this)
		$('body')
			.bind('focusin', this.focusHandler)
			.bind('keydown', this.keyDownHandler)
	}

	static unbindHandlers() {
		$('body')
			.unbind('focusin', this.focusHandler)
			.unbind('keydown', this.keyDownHandler)
	}

	static getActiveInstance() {
		return this.instances[this.instances.length - 1]
	}

	static handleFocus() {
		this.getActiveInstance().checkFocus()
	}

	static handleKeyDown(event) {
		if (event.keyCode === keyCodes.TAB) this.getActiveInstance().scopeTab(event)
	}
}
