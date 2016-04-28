const HORIZ_SPECIAL_VALUES = {
	left: {value: 0, unit: '%'},
	center: {value: 50, unit: '%'},
	right: {value: 100, unit: '%'}
}

const VERT_SPECIAL_VALUES = {
	top: {value: 0, unit: '%'},
	middle: {value: 50, unit: '%'},
	bottom: {value: 100, unit: '%'}
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
 * @property {'px'|'%'} [unit='px']
 */

function parseValue(value, pointStr, specialValues) {
	let parsed = parseInt(value, 10)
	if (Number.isNaN(parsed)) {
		// test that value is Vert or Horiz point value
		if (!specialValues) {
			throw new Error(`"${value}" can't be parsed as integer`)
		} else if (!specialValues[value]) {
			throw new Error(`"${value}" is not valid special value ` +
				`in the attachment point "${pointStr}"`)
		} else {
			return specialValues[value]
		}
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

/**
 * @param pointStr {string}
 * @param {string} [useSpecialValues=true]
 */
function parsePoint(pointStr, useSpecialValues = true) {
	let [horiz, vert] = pointStr.split(' ')
	return {
		horiz: parseValue(horiz, pointStr, useSpecialValues ? HORIZ_SPECIAL_VALUES : undefined),
		vert: parseValue(vert, pointStr, useSpecialValues ? VERT_SPECIAL_VALUES : undefined)
	}
}

/**
 * Parses string attachment config from options.
 * @param {AttachmentConfig} config
 * @return {ParsedAttachment}
 */
export default function parseAttachmentConfig(config) {
	let parsed = {
		element: parsePoint(config.element, true),
		target: parsePoint(config.target, true)
	}
	if (config.offset) parsed.offset = parsePoint(config.offset, false)
	return parsed
}
