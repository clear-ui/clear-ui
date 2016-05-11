import assert from 'assert'

import getAttachPosition from '../getAttachPosition'

// <---------------1000------------------->
//			/\
//			\/ 100
//        __________
//		 | 200x200 |
// <100> | target  |
//		 |____x____|
//        | elem  |
//		  |120x120|
//        |_______|
//

// element can fit at bottom side but not at top
let MEASUREMENTS = {
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

let TOP_ATTACHMENT = {
	target: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 0, unit: '%'}
	},
	element: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 100, unit: '%'}
	}
}

let BOTTOM_ATTACHMENT = {
	target: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 100, unit: '%'}
	},
	element: {
		horiz: {value: 50, unit: '%'},
		vert: {value: 0, unit: '%'}
	}
}

let BOTTOM_POS = {
	top: MEASUREMENTS.target.offset.top + MEASUREMENTS.target.height,
	left: MEASUREMENTS.target.offset.left + MEASUREMENTS.target.width / 2 -
		MEASUREMENTS.element.width / 2
}

describe('attachment/class/getAttachPosition', function() {
	it('calculates attach position', function() {
		let res = getAttachPosition({
			measurements: MEASUREMENTS, 
			attachments: [BOTTOM_ATTACHMENT],
			constrain: false, 
			viewportPadding: 0,
			mirrorAttachment: 'none'
		})
		assert.deepEqual(res[0], BOTTOM_POS)
	})

	it('chooses attach position that fits', function() {
		let res = getAttachPosition({
			measurements: MEASUREMENTS, 
			attachments: [TOP_ATTACHMENT, BOTTOM_ATTACHMENT],
			constrain: false,
			viewportPadding: 0, 
			mirrorAttachment: 'none'
		})
		assert.deepEqual(res[0], BOTTOM_POS)
	})

	it('calculates mirrored attach position', function() {
		let res = getAttachPosition({
			measurements: MEASUREMENTS,
			attachments: [TOP_ATTACHMENT],
			constrain: false,
			viewportPadding: 0, 
			mirrorAttachment: 'all'
		})
		assert.deepEqual(res[0], BOTTOM_POS)
	})
})
