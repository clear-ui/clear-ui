// @flow

import type {
	Measurements, ParsedAttachmentConfig, AttachmentConstrain, AttachmentConstrainSide,
	CssPosition, PointValue
} from './types.js'

function calcCoord(value: PointValue, size: number): number {
	let coord = (value.unit === '%') ? (size * value.value / 100) : value.value
	if (value.mirrored) coord = size - coord
	return coord
}

function calcPosition(
	measurements: Measurements, attachment: ParsedAttachmentConfig
): CssPosition {
	let elem = measurements.element
	let target = measurements.target

	let hElemCoord = calcCoord(attachment.element.horiz, elem.width)
	let hTargetCoord = calcCoord(attachment.target.horiz, target.width)
	let hOffsetCoord = attachment.offset ?
		calcCoord(attachment.offset.horiz, elem.width) : 0
	let hCoord = target.offset.left + hTargetCoord + hOffsetCoord - hElemCoord

	let vElemCoord = calcCoord(attachment.element.vert, elem.height)
	let vTargetCoord = calcCoord(attachment.target.vert, target.height)
	let vOffsetCoord = attachment.offset ?
		calcCoord(attachment.offset.vert, elem.height) : 0
	let vCoord = target.offset.top + vTargetCoord + vOffsetCoord - vElemCoord

	return {left: Math.round(hCoord), top: Math.round(vCoord)}
}

function checkFitViewport(pos: CssPosition, m: Measurements, padding: number): boolean {
	return (
		(pos.left >= m.bounds.left + padding) &&
		(pos.left + m.element.width <= m.bounds.right - padding) &&
		(pos.top >= m.bounds.top + padding) &&
		(pos.top + m.element.height <= m.bounds.bottom - padding)
	)
}

function constrainPosition(
	pos: CssPosition,
	m: Measurements,
	constrain: AttachmentConstrain,
	padding: number
): CssPosition {
	if (constrain.left) {
		if (pos.left < m.bounds.left + padding) pos.left = m.bounds.left + padding
	}
	if (constrain.top) {
		if (pos.top < m.bounds.top + padding) pos.top = m.bounds.top + padding
	}
	if (constrain.right) {
		if (pos.left + m.element.width > m.bounds.right - padding) {
			pos.left = m.bounds.right - m.element.width - padding
		}
	}
	if (constrain.bottom) {
		if (pos.top + m.element.height > m.bounds.bottom - padding) {
			pos.top = m.bounds.bottom - m.element.height - padding
		}
	}
	return pos
}

/**
 * Finds attachment that can fit element in the viewport and
 * returns position of attached element.
 * @return {[number, Position]} Array with 2 elements.
 *     First is index of chosen attachment, second is position object.
 */
export default function getAttachPosition(
	measurements: Measurements,
	attachments: Array<ParsedAttachmentConfig>,
	constrain: AttachmentConstrain,
	padding: number
): [number, CssPosition | null] {
	let pos = null, i = -1
	for (i = 0; i < attachments.length; i++) {
		let att = attachments[i]
		pos = calcPosition(measurements, att)
		if (checkFitViewport(pos, measurements, padding)) break
	}
	if (constrain && pos) {
		pos = constrainPosition(pos, measurements, constrain, padding)
	}
	return [i, pos]
}
