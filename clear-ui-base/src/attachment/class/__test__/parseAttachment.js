import assert from 'assert'

import parseAttachment from '../parseAttachmentConfig'

describe('attachment/class/parseAttachmentConfig', function() {
	it('parses attachment config', function() {
		let att = {
			element: '10px 20%',
			target: 'right top '
		}
		let parsed = parseAttachment(att)
		assert.deepEqual(parsed, {
			element: {
				horiz: {value: 10, unit: 'px'},
				vert: {value: 20, unit: '%'}
			},
			target: {
				horiz: {value: 100, unit: '%'},
				vert: {value: 0, unit: '%'}
			}
		})
	})

	it('throws if position has invalid unit', function() {
		let att = {
			element: '0inv 0px',
			target: '0px 0px'
		}

		let thrown
		try {
			parseAttachment(att)
		} catch (err) {
			thrown = true
			assert(err.message.indexOf('not valid unit') !== -1)
		}
		assert(thrown)
	})

	it('throws if invalid special value is provided', function() {
		let att = {
			element: 'invalid 0px',
			target: '0px 0px'
		}

		let thrown
		try {
			parseAttachment(att)
		} catch (err) {
			thrown = true
			assert(err.message.indexOf('not valid special value') !== -1)
		}
		assert(thrown)
	})
})
