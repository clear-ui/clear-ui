/*!
 * Adapted from react-modal
 *
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

import $ from 'jquery'

let FOCUSABLE_NODES = ['input', 'select', 'textarea', 'button', 'object']

function focusable(element, tabIndexIsNaN) {
	let result
	let nodeName = element.nodeName.toLowerCase()
	if (FOCUSABLE_NODES.indexOf(nodeName) !== -1) {
		result = !element.disabled
	} else {
		result = (nodeName === 'a') ?
			(element.href || !tabIndexIsNaN) :
			!tabIndexIsNaN
	}
	return result && $(element).is(':visible')
}

function tabbable(element) {
	let tabIndex = element.getAttribute('tabindex')
	let tabIndexIsNaN = (tabIndex === null) || isNaN(tabIndex)
	return (tabIndexIsNaN || tabIndex >= 0) && focusable(element, tabIndexIsNaN)
}

export default function findTabbable(element) {
	return Array.from(element.querySelectorAll('*'))
		.filter((elem) => tabbable(elem))
}
