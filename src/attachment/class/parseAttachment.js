let SPECIAL_VALUES = {
	horiz: {
		left: {value: 0, unit: '%'},
		center: {value: 50, unit: '%'},
		right: {value: 100, unit: '%'}
	},
	vert: {
		top: {value: 0, unit: '%'},
		middle: {value: 50, unit: '%'},
		bottom: {value: 100, unit: '%'}
	}
}

/**
 * @typedef ParsedAttachment
 * @property {Point} target - Parsed target attachment point.
 * @property {Point} element - Parsed element attachment point.
 * @property {Point} [offset] - Parsed offset.
 */

/**
 * @typedef Point
 * @property {Value} horiz
 * @property {Value} vert
 */

/**
 * @typedef Value
 * @property {number|string} value - Number or special value.
 * @property {'px'|'%'} [unit]
 */

/**
 * Parses string attachment from options.
 * @param {Attachment} attachment
 * @return {ParsedAttachment}
 */
export default function parseAttachment(attachment) {
	let parsed = {
		element: parsePoint(attachment.element, true),
		target: parsePoint(attachment.target, true)
	}
	if (attachment.offset) parsed.offset = parsePoint(attachment.offset, false)
	return parsed
}

/**
 * @param pointStr {string}
 * @param {string} [useSpecialValues=true]
 * @param {array} [specialValues]
 */
function parsePoint(pointStr, useSpecialValues = true) {
	let [horiz, vert] = pointStr.split(' ')
	return {
		horiz: parseValue(horiz, pointStr, useSpecialValues ? SPECIAL_VALUES.horiz : null),
		vert: parseValue(vert, pointStr, useSpecialValues ? SPECIAL_VALUES.vert : null)
	}
}

function parseValue(value, pointStr, specialValues) {
	let parsed = parseInt(value)
	if (Number.isNaN(parsed)) {
		if (!specialValues) throw new Error(`"${value}" can't be parsed as integer`)
		if (!specialValues[value]) {
			throw new Error(`"${value}" is not valid special value ` +
				`in the attachment point "${pointStr}"`)
		}
		return specialValues[value]
	} else {
		let unit = value.slice(parsed.toString().length)
		if (!unit.length) unit = 'px'
		if (unit !== 'px' && unit !== '%') {
			throw new Error(`"${unit}" is not valid unit ` +
				`in the attachment point "${pointStr}"`)
		}
		return {value: parsed, unit}
	}
}
