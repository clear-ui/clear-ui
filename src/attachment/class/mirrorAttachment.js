import _ from 'underscore'

/**
 * @param {Attachment} attachment
 * @param {'all'|'horiz'|'vert'} [axis='all'] - Which axis should be mirrored.
 * @return {Attachment}
 */
export default function mirrorAttachment(attachment, axis = 'all') {
	let res = {
		element: mirrorAttachmentPoint(attachment.element, axis),
		target: mirrorAttachmentPoint(attachment.target, axis),
	}
	if (attachment.offset) res.offset = mirrorOffset(attachment.offset, axis)
	return res
}

function mirrorOffset(point, axis) {
	let mirrored = {
		horiz: _.clone(point.horiz),
		vert: _.clone(point.vert)
	}
	if (axis === 'all' || axis === 'horiz') mirrored.horiz.value = -mirrored.horiz.value
	if (axis === 'all' || axis === 'vert') mirrored.vert.value = -mirrored.vert.value
	return mirrored
}

function mirrorAttachmentPoint(point, axis) {
	let mirrored = {
		horiz: _.clone(point.horiz),
		vert: _.clone(point.vert)
	}
	if (axis === 'all' || axis === 'horiz') mirrored.horiz.mirrored = true
	if (axis === 'all' || axis === 'vert') mirrored.vert.mirrored = true
	return mirrored
}
