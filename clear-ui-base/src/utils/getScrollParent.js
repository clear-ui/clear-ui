/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */ 

import $ from 'jquery'

export default function getScrollParent(elem) {
	let overflowRegex = /(auto|scroll)/
	let position = elem.css('position')
	let excludeStaticParent = position === 'absolute'
	let scrollParent = elem.parents().filter(function() {
		var parent = $(this)
		if (excludeStaticParent && parent.css('position') === 'static') {
			return false
		}
		var overflowState = parent.css(['overflow', 'overflowX', 'overflowY'])
		return (overflowRegex).test(
		  overflowState.overflow + overflowState.overflowX + overflowState.overflowY
		)
	}).eq(0)

	return (position === 'fixed' || !scrollParent.length) ?
	  $(elem[0].ownerDocument || document) :
	  scrollParent
}
