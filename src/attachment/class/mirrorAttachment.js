import _ from 'underscore'

/**
 * @param {Attachment} attachment
 * @param {'all'|'horiz'|'vert'} [axis='all'] - Which axis should be mirrored.
 * @return {Attachment}
 */
export default function mirrorAttachment(attachment, measurements, axis = 'all') {
	return {
		element: mirrorAttachmentPoint(attachment.element, measurements, axis),
		target: mirrorAttachmentPoint(attachment.target, measurements, axis)
	}
}

// TODO mirror offset
function mirrorAttachmentPoint(point, axis) {
	let mirrored = {
		horiz: _.clone(point.horiz),
		vert: _.clone(point.vert),
		offset: _.clone(point.offset)
	}
	if (axis === 'all' || axis === 'horiz') mirrored.horiz.mirror = true
	if (axis === 'all' || axis === 'vert') mirrored.vert.mirror = true
	return mirrored
}
