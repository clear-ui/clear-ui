// @flow
import _ from 'underscore'

import type {Point, AttachmentMirrorAxis, ParsedAttachmentConfig} from './types.js'

function mirrorOffset(point: Point, axis: AttachmentMirrorAxis) {
	let mirrored = {
		horiz: _.clone(point.horiz),
		vert: _.clone(point.vert)
	}
	if (axis === 'all' || axis === 'horiz') mirrored.horiz.value = -mirrored.horiz.value
	if (axis === 'all' || axis === 'vert') mirrored.vert.value = -mirrored.vert.value
	return mirrored
}

function mirrorAttachmentPoint(point: Point, axis: AttachmentMirrorAxis) {
	let mirrored = {
		horiz: _.clone(point.horiz),
		vert: _.clone(point.vert)
	}
	if (axis === 'all' || axis === 'horiz') mirrored.horiz.mirrored = true
	if (axis === 'all' || axis === 'vert') mirrored.vert.mirrored = true
	return mirrored
}

export default function mirrorAttachmentConfig(
	attachment: ParsedAttachmentConfig,
	/** Which axis should be mirrored. */
	axis?: AttachmentMirrorAxis = 'all'
): ParsedAttachmentConfig {
	let res: ParsedAttachmentConfig = {
		element: mirrorAttachmentPoint(attachment.element, axis),
		target: mirrorAttachmentPoint(attachment.target, axis)
	}
	if (attachment.offset) res.offset = mirrorOffset(attachment.offset, axis)
	return res
}
