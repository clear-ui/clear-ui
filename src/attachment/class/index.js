import $ from 'jquery'

import parseAttachment from './parseAttachment'
import mirrorAttachment from './mirrorAttachment'
import readMeasurements from './readMeasurements'
import getAttachPosition from './getAttachPosition'

let SUPPORTS_TRANSFORM = 'transform' in document.body.style

/**
 * TODO rename to AttachmentPoint
 * @typedef Attachment
 * @property {string} element - Attachment point of the element.
 *     String of the form of 'vert-attachment horiz-attachment'.
 *     Attachment value is a number with 'px' or '%'.
 *     Also, 'vert-attachment' can be: 'top', 'middle' and 'bottom',
 *     and 'horiz-attachment' can be 'left', 'right' and 'center'.
 * @property {string} target - Attachment point of the target element.
 *     Format is same as for 'element'.
 * @property {string} [offset] - Offset of the element.
 *     Format is same as for 'element' and 'target', but without special values.
 */

/**
 * @class
 * It makes element stay next to another element, connecting two attachment
 * points on the elements.
 *
 * @param {object} options
 * @param {DOMElem|$} options.element
 * @param {DOMElem|$} options.target
 * @param {Attachment|array.<Attachment>} options.attachment - Attachment
 *     or a list of possible attachments. Component will choose an attachment
 *     that allows element to fit to the viewport.
 * @param {'all'|'vert'|'horiz'|'none'} [options.mirrorAttachment='none'] -
 *     Axis of attachment that can be mirrored to fit element to the viewport.
 *     It is used when single attachment used. FIXME why not always?
 * @param {number} [viewportPadding=0] - Minimal padding from element to the
 *     viewport bound.
 */
export default class Attachment {
	constructor(options) {
		this.options = {}
		options = Object.assign({
			mirrorAttachment: 'none',
			viewportPadding: 0
		}, options)
		this.updateOptions(options)

		Attachment.addInstance(this)
	}

	destroy() {
		Attachment.removeInstance(this)
	}

	updateOptions(options) {
		if (!(options.element instanceof $)) options.element = $(options.element)
		if (!(options.target instanceof $)) options.target = $(options.target)
		Object.assign(this.options, options)
		if (options.attachment) {
			this.options.parsedAttachments = this.parseAttachments(options.attachment)
		}
		if (!this.options.attachment) throw new Error('"options.attachment" is required')
		this.updatePosition()
	}

	parseAttachments(attachment) {
		if (Array.isArray(attachment)) {
			return attachment.map((att) => { return parseAttachment(att) })
		} else {
			let parsedAttachment = parseAttachment(attachment)
			let parsedAttachments = [parsedAttachment]
			switch (this.options.mirrorAttachment) {
			case 'horiz':
				parsedAttachments.push(mirrorAttachment(parsedAttachment, 'horiz'))
				break
			case 'vert':
				parsedAttachments.push(mirrorAttachment(parsedAttachment, 'vert'))
				break
			case 'all':
				parsedAttachments.push(mirrorAttachment(parsedAttachment, 'vert'))
				parsedAttachments.push(mirrorAttachment(parsedAttachment, 'horiz'))
				parsedAttachments.push(mirrorAttachment(parsedAttachment))
				break
			}
			return parsedAttachments
		}
	}

	updatePosition() {
		//if (!this.options.element.is(':visible') || !this.options.target.is(':visible')) return
		let measurements = readMeasurements(this.options.element, this.options.target)
		let [index, position] = getAttachPosition(measurements, this.options.parsedAttachments)
		this.setPosition(position)
		if (this.prevAttachmentIndex !== index) {
			this.options.onChangeAttachment && this.options.onChangeAttachment(index)
			this.prevAttachmentIndex = index
		}
	}

	setPosition(position) {
		//let css = SUPPORTS_TRANSFORM ?
			//{
				//transform: `translate(${position.left}px, ${position.top}px)`,
				//top: 0, left: 0
			//} :
			//position
		//if (!_.isEqual(css, this.cachedCss)) {
		//	this.cachedCss = css
		//this.options.element.css(css)
		//}
		this.options.element.css(position)
	}

	static updatePosition() {
		//TODO batch recalc/reflow
		//this.updatedInstances.forEach(function(item) {
		//	item.readMeasurements()
		//})
		this.updatedInstances.forEach(function(item) {
			item.updatePosition()
		})
	}

	static updatedInstances = new Set()

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
