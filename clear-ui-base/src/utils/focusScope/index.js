import $ from 'jquery'
import keyCodes from '../keyCodes'
import findTabbable from './findTabbable'

/**
 * It restricts focus inside element.
 * On create it sets focus to first focusable element.
 * On destroy it returns focus to the element that was focused before.
 * @param element {element}
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
		document.activeElement.blur()
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
					// it can be not in the document already
					this.savedFocus.focus()
				} catch (e) {} // eslint-disable-line no-empty
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
