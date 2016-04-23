import assert from 'assert'

import getAttachPosition from '../getAttachPosition'
import mirrorAttachmentConfig from '../mirrorAttachmentConfig'

// element can fit at bottom side but not at top
var MEASUREMENTS = {
	target: {
		width: 200,
		height: 200,
		offset: {
			left: 100,
			top: 600
		}
	},
	element: {
		width: 120,
		height: 120
	},
	viewport: {
		scrollTop: 500,
		scrollLeft: 0,
		height: 500,
		width: 1000
	},
	bounds: {
		bottom: 500,
		top: 1000,
		left: 0,
		right: 1000
	}
}

var TOP_ATTACHMENT = {
	target: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 0, unit: '%'}
	},
	element: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 100, unit: '%'}
	}
}

var BOTTOM_ATTACHMENT = {
	target: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 100, unit: '%'}
	},
	element: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 0, unit: '%'}
	}
}

var BOTTOM_POS = {
	top: MEASUREMENTS.target.offset.top + MEASUREMENTS.target.height,
	left: MEASUREMENTS.target.offset.left + MEASUREMENTS.target.width / 2 -
		MEASUREMENTS.element.width / 2
}

var MIRROR_ATTACHMENT = mirrorAttachmentConfig({
	target: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 30, unit: '%'} // height - 30% = 70%
	},
	element: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 30, unit: 'px'} // height - 30px
	}
}, 'vert')

let MIRROR_POS = {
	top: MEASUREMENTS.target.offset.top + MEASUREMENTS.target.height * 0.7 -
		(MEASUREMENTS.element.height - 30),
	left: MEASUREMENTS.target.offset.left + MEASUREMENTS.target.width / 2 -
		MEASUREMENTS.element.width / 2
}

describe('attachment/class/getAttachPosition', function() {
	it('calculates attach position', function() {
		let res = getAttachPosition(MEASUREMENTS, [BOTTOM_ATTACHMENT])
		assert.deepEqual(res[1], BOTTOM_POS)
	})

	it('chooses attach position that fits', function() {
		let res = getAttachPosition(MEASUREMENTS, [TOP_ATTACHMENT, BOTTOM_ATTACHMENT])
		assert.deepEqual(res[1], BOTTOM_POS)
	})

	it('calculates mirrored attach position', function() {
		let res = getAttachPosition(MEASUREMENTS, [MIRROR_ATTACHMENT])
		assert.deepEqual(res[1], MIRROR_POS)
	})
})
