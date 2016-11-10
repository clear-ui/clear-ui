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

function getTabIndex(element) {
	return parseInt(element.getAttribute('tabindex'), 10)
}

function tabbable(element) {
	let tabIndex = getTabIndex(element)
	let tabIndexIsNaN = Number.isNaN(tabIndex)
	return focusable(element, tabIndexIsNaN) && tabIndex !== -1
}

function sortTabIndex(a, b) {
	let aTabIndex = getTabIndex(a)
	let bTabIndex = getTabIndex(b)
	let aIsSortable = !Number.isNaN(aTabIndex) && aTabIndex !== 0
	let bIsSortable = !Number.isNaN(bTabIndex) && bTabIndex !== 0

	if (aIsSortable && bIsSortable) return aTabIndex - bTabIndex
	else if (!aIsSortable && !bIsSortable) return 0
	else if (aIsSortable) return -1
	else if (bIsSortable) return 1
}

export default function findTabbable(element) {
	return Array.from(element.querySelectorAll('*'))
		.filter((elem) => { return tabbable(elem) })
		.sort(sortTabIndex)
}
