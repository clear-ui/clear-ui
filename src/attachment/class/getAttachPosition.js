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
export default function getAttachPosition(measurements, attachments, constrain, padding) {
	let pos, i
	for (i in attachments) {
		let att = attachments[i]
		pos = calcPosition(measurements, att)
		if (checkFitViewport(pos, measurements, padding)) break
	}
	if (constrain) {
		pos = constrainPosition(pos, measurements, constrain, padding)
	}
	return [i, pos]
}

function calcCoord(value, size) {
	let coord = (value.unit === '%') ? (size * value.value / 100) : value.value
	if (value.mirrored) coord = size - coord
	return coord
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

function checkFitViewport(pos, m/* measurements */, padding) {
	return (
		(pos.left >= m.bounds.left + padding) &&
		(pos.left + m.element.width <= m.bounds.right - padding) &&
		(pos.top >= m.bounds.top + padding) &&
		(pos.top + m.element.height <= m.bounds.bottom - padding)
	)
}

function constrainPosition(pos, m /* measurements */, constrain, padding) {
	let sides = {}
	if (constrain === true) {
		sides = {left: true, right: true, top: true, bottom: true}
	} else {
		for (let i in constrain) sides[constrain[i]] = true
	}

	if (sides.left) {
		if (pos.left < m.bounds.left + padding) pos.left = m.bounds.left + padding
	}
	if (sides.top) {
		if (pos.top < m.bounds.top + padding) pos.top = m.bounds.top + padding
	}
	if (sides.right) {
		if (pos.right + m.element.width > m.bounds.right - padding) {
			pos.right = m.bounds.right - m.element.width - padding
		}
	}
	if (sides.bottom) {
		if (pos.top + m.element.height > m.bounds.bottom - padding) {
			pos.top = m.bounds.bottom - m.element.height - padding
		}
	}
	return pos
}
