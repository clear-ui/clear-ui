// @flow

import type {
	AttachmentConfig, ParsedAttachmentConfig,
	PointValue, Unit, Point,
	VertSpecialValue, HorizSpecialValue, SpecialValuesMap
} from './types.js'

const HORIZ_SPECIAL_VALUES: SpecialValuesMap<HorizSpecialValue> = {
	left: {value: 0, unit: '%'},
	center: {value: 50, unit: '%'},
	right: {value: 100, unit: '%'}
}

const VERT_SPECIAL_VALUES: SpecialValuesMap<VertSpecialValue> = {
	top: {value: 0, unit: '%'},
	middle: {value: 50, unit: '%'},
	bottom: {value: 100, unit: '%'}
}

function parseValue(value: string, pointStr: string, specialValues?: SpecialValuesMap):
	PointValue {
	let parsed = parseInt(value)
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
		let unitStr = value.slice(parsed.toString().length)
		let unit: Unit
		if (!unitStr.length) {
			unit = 'px'
		} else if (unitStr === 'px' || unitStr === '%') {
			unit = unitStr
		} else {
			throw new Error(`"${unit}" is not valid unit ` +
				`in the attachment point "${pointStr}"`)
		}
		return {value: parsed, unit}
	}
}

function parsePoint(pointStr: string, useSpecialValues: boolean = true): Point {
	let [horiz, vert] = pointStr.split(' ')
	return {
		horiz: parseValue(horiz, pointStr, useSpecialValues ? HORIZ_SPECIAL_VALUES : undefined),
		vert: parseValue(vert, pointStr, useSpecialValues ? VERT_SPECIAL_VALUES : undefined)
	}
}

/** Parses string attachment config from options. */
export default function parseAttachmentConfig(config: AttachmentConfig):
	ParsedAttachmentConfig {
	let parsed: ParsedAttachmentConfig = {
		element: parsePoint(config.element, true),
		target: parsePoint(config.target, true)
	}
	if (config.offset) parsed.offset = parsePoint(config.offset, false)
	return parsed
}
