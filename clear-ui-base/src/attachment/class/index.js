import $ from 'jquery'
import _ from 'underscore'

import parseAttachmentConfig from './parseAttachmentConfig'
import readMeasurements from './readMeasurements'
import getAttachPosition from './getAttachPosition'

/**
 * @type AttachmentConfig
 * Description of how the attached element should be positioned relatively
 * to the target element. It has two points, one on the attached element and
 * second on the target element, that will be connected together, and an offset.
 * @param {string} element - Attachment point of the element.
 *     String of the form of 'vert-attachment horiz-attachment'.
 *     Attachment value is a number with 'px' or '%'.
 *     Also, 'vert-attachment' can be: 'top', 'middle' and 'bottom',
 *     and 'horiz-attachment' can be 'left', 'right' and 'center'.
 * @param {string} target - Attachment point of the target element.
 *     Format is same as for 'element'.
 * @param {string} [offset] - Offset of the element. Format is same as for
 *     'element' and 'target', but without special values.
 */

/**
 * @type AttachmentOptions
 * @param {Element|$} element - Attached element
 * @param {Element|$} target - Attachment target
 * @param {AttachmentConfig|Array<AttachmentConfig>} attachment -
 *     Configuration of attachment points or a list of possible configs.
 *     Component will choose an attachment that allows element to fit to the viewport.
 * @param {'all'|'vert'|'horiz'|'none'} [mirrorAttachment='none'] -
 *     Axis of attachment that can be mirrored to fit element to the viewport.
 *     It is used when single attachment used. FIXME why not always?
 * @param {number} [viewportPadding=0] - Minimal distance from element to the viewport bound.
 * @param {boolean} [constrain] - TODO
 * @param {function(index: number, mirror: AttachmentMirrorAxis)} [onChangeAttachment] - TODO
 */

/**
 * It makes element stay next to another element, connecting two attachment
 * points on the elements.
 * @param options {AttachmentOptions}
 */
class Attachment {
	constructor(options) {
		this.updateOptions(options)
		Attachment.addInstance(this)
	}

	/** TODO */
	destroy() {
		Attachment.removeInstance(this)
	}

	processOptions(options) {
		let DEFAULT_OPTIONS = {
			constrain: false,
			mirrorAttachment: 'none',
			viewportPadding: 0
		}

		let {element, target, attachment, ...rest} = options

		let parsedAttachments
		if (attachment) {
			if (Array.isArray(attachment) && !attachment.length) {
				throw new Error('"options.attachment" must not be empty')
			}
			parsedAttachments = this.parseAttachments(attachment)
		} else {
			throw new Error('"options.attachment" is required')
		}

		return {
			...DEFAULT_OPTIONS,
			element: element instanceof $ ? element : $(element),
			target: target instanceof $ ? target : $(target),
			parsedAttachments,
			...rest
		}
	}

	/** TODO */
	updateOptions(options) {
		this.options = this.processOptions(options)
		this.updatePosition()
	}

	parseAttachments(attachment) {
		if (Array.isArray(attachment)) {
			return attachment.map((att) => { return parseAttachmentConfig(att) })
		} else {
			return [parseAttachmentConfig(attachment)]
		}
	}

	/** @public TODO */
	updatePosition() {
		let {parsedAttachments, constrain, viewportPadding, mirrorAttachment} = this.options
		// if (!this.options.element.is(':visible') || !this.options.target.is(':visible')) return
		let measurements = readMeasurements(this.options.element, this.options.target)
		let [position, index, mirror] = getAttachPosition({
			measurements,
			constrain,
			viewportPadding,
			mirrorAttachment,
			attachments: parsedAttachments,
		})
		if (position) this.setPosition(position)
		if (this.prevAttachmentIndex !== index || _.deepEqual(this.prevMirror, mirror)) {
			if (this.options.onChangeAttachment) {
				this.options.onChangeAttachment(index, mirror)
			}
			this.prevAttachmentIndex = index
			this.prevAttachmentIndex = mirror
		}
	}

	setPosition(position) {
		this.options.element.css(position)
	}

	static updatedInstances = new Set();

	/** @public TODO */
	static updatePosition() {
		// TODO batch recalc/reflow
		// this.updatedInstances.forEach(function(item) {
		//	item.readMeasurements()
		// })
		this.updatedInstances.forEach(function(item) {
			item.updatePosition()
		})
	}

	static addInstance(inst) {
		if (this.updatedInstances.size === 0) this.bindHandlers()
		this.updatedInstances.add(inst)
	}

	static removeInstance(inst) {
		this.updatedInstances.delete(inst)
		if (this.updatedInstances.size === 0) this.unbindHandlers()
	}

	static bindHandlers() {
		this.listener = this.updatePosition.bind(this)
		$(window).bind('scroll resize', this.listener)
	}

	static unbindHandlers() {
		$(window).unbind('scroll resize', this.listener)
	}
}

export default Attachment
