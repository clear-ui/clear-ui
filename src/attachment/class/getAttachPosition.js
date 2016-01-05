/**
 * @typedef {Object} Position
 * @property {number} left
 * @property {number} top
 */

/**
 * Finds attachment that can fit element in the viewport and
 * returns position of attached element.
 * @param {object} measurements
 * @param {array.<Attachment>} attachments
 * @return {[number, Position]} Array with 2 elements.
 *     First is index of chosen attachment, second is position object.
 */
export default function getAttachPosition(measurements, attachments) {
	let pos, i
	for (i in attachments) {
		let att = attachments[i]
		pos = calcPosition(measurements, att)
		if (checkFitViewport(measurements, pos)) break
	}
	return [i, pos]
}

function calcPosition(measurements, attachment) {
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

function calcCoord(value, size) {
	let coord = (value.unit === '%') ? (size * value.value / 100) : value.value
	if (value.mirrored) coord = size - coord
	return coord
}

function checkFitViewport(m/* measurements */, pos) {
	return (
		(pos.left >= m.bounds.left) &&
		(pos.left + m.element.width <= m.bounds.right) &&
		(pos.top >= m.bounds.top) &&
		(pos.top + m.element.height <= m.bounds.bottom)
	)
}
