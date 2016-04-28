function calcCoord(value, size, mirror) {
	let coord = (value.unit === '%') ? (size * value.value / 100) : value.value
	if (mirror) coord = size - coord
	return coord
}

function calcPosition(measurements, attachment, mirror) {
	let elem = measurements.element
	let target = measurements.target

	let mirrorHoriz = mirror === 'horiz' || mirror === 'all'
	let hElemCoord = calcCoord(attachment.element.horiz, elem.width, mirrorHoriz)
	let hTargetCoord = calcCoord(attachment.target.horiz, target.width, mirrorHoriz)
	let hOffsetCoord = attachment.offset ?
		calcCoord(attachment.offset.horiz, elem.width) : 0
	if (mirrorHoriz) hOffsetCoord = -hOffsetCoord
	let hCoord = target.offset.left + hTargetCoord + hOffsetCoord - hElemCoord

	let mirrorVert = mirror === 'vert' || mirror === 'all'
	let vElemCoord = calcCoord(attachment.element.vert, elem.height, mirrorVert)
	let vTargetCoord = calcCoord(attachment.target.vert, target.height, mirrorVert)
	let vOffsetCoord = attachment.offset ?
		calcCoord(attachment.offset.vert, elem.height) : 0
	if (mirrorVert) vOffsetCoord = -vOffsetCoord
	let vCoord = target.offset.top + vTargetCoord + vOffsetCoord - vElemCoord

	return {left: Math.round(hCoord), top: Math.round(vCoord)}
}

function checkFitViewport(pos, m, padding) {
	return (
		(pos.left >= m.bounds.left + padding) &&
		(pos.left + m.element.width <= m.bounds.right - padding) &&
		(pos.top >= m.bounds.top + padding) &&
		(pos.top + m.element.height <= m.bounds.bottom - padding)
	)
}

function constrainPosition(pos, m /* measurements */, padding) {
	if (pos.left < m.bounds.left + padding) pos.left = m.bounds.left + padding
	if (pos.top < m.bounds.top + padding) pos.top = m.bounds.top + padding
	if (pos.left + m.element.width > m.bounds.right - padding) {
		pos.left = m.bounds.right - m.element.width - padding
	}
	if (pos.top + m.element.height > m.bounds.bottom - padding) {
		pos.top = m.bounds.bottom - m.element.height - padding
	}
	return pos
}

function getMirrorsList(mirror) {
	let mirrors = ['none']
	if (mirror === 'vert' || mirror === 'all') mirrors.push('vert')
	if (mirror === 'horiz' || mirror === 'all') mirrors.push('horiz')
	if (mirror === 'all') mirrors.push('all')
	return mirrors
}

/**
 * Finds attachment that can fit element in the viewport and
 * returns position of attached element.
 * @return {[number, Position]} Array with 2 elements.
 *     First is index of chosen attachment, second is position object.
 */
export default function getAttachPosition(
	measurements, attachments, constrain, padding, mirrorOption
) {
	let mirrorsList = getMirrorsList(mirrorOption)
	console.log('MIRRORLIST', mirrorOption, mirrorsList)
	let pos, index, mirror
	outer: for (index in attachments) {
		let att = attachments[index]
		for (let j in mirrorsList) {
			mirror = mirrorsList[j]
			pos = calcPosition(measurements, att, mirror)
			if (checkFitViewport(pos, measurements, padding)) break outer
		}
	}
	if (constrain && pos) {
		pos = constrainPosition(pos, measurements, padding)
	}
	return [pos, index, mirror]
}

