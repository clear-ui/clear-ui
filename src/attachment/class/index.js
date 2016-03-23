// @flow
import $ from 'jquery'

import parseAttachmentConfig from './parseAttachmentConfig'
import mirrorAttachmentConfig from './mirrorAttachmentConfig'
import readMeasurements from './readMeasurements'
import getAttachPosition from './getAttachPosition'

import type {
	AttachmentConfig, ParsedAttachmentConfig,
	CssPosition, AttachmentMirrorAxis, AttachmentConstrain
} from './types.js'

// let SUPPORTS_TRANSFORM = 'transform' in document.body.style

type AttachmentOptions = {
	/** Attached element */
	element: Element | $;

	/** Attachment target */
	target: Element | $;

	/**
	 * Configuration of attachment points or a list of possible configs.
	 * Component will choose an attachment that allows element to fit to the viewport.
	 */
	attachment: AttachmentConfig | Array<AttachmentConfig>;

	/**
	 * Axis of attachment that can be mirrored to fit element to the viewport.
	 * It is used when single attachment used. FIXME why not always?
	 * Default is 'none'.
	 */
	mirrorAttachment?: AttachmentMirrorAxis;

	/** Minimal distance from element to the viewport bound. Default is 0. */
	viewportPadding?: number;

	/** TODO */
	constrain?: boolean | AttachmentConstrain;

	/** TODO */
	onChangeAttachment?: (index: number) => void;
}

type ProcessedOptions = {
	element: $;
	target: $;
	parsedAttachments: Array<ParsedAttachmentConfig>;
	viewportPadding: number;
	constrain: AttachmentConstrain;
	onChangeAttachment?: (index: number) => void;
}

/**
 * It makes element stay next to another element, connecting two attachment
 * points on the elements.
 */
class Attachment {
	options: ProcessedOptions;

	prevAttachmentIndex: number;

	constructor(options: AttachmentOptions) {
		this.updateOptions(options)

		Attachment.addInstance(this)
	}

	/** TODO */
	destroy() {
		Attachment.removeInstance(this)
	}

	processOptions(options: AttachmentOptions): ProcessedOptions {
		let DEFAULT_OPTIONS = {
			constrain: false,
			mirrorAttachment: 'none',
			viewportPadding: 0
		}

		let {element, target, constrain, attachment, mirrorAttachment, ...rest} = options

		if (typeof constrain === 'boolean' || typeof constrain === 'undefined') {
			constrain = constrain ?
				{left: true, right: true, top: true, bottom: true} :
				{}
		}

		let parsedAttachments
		if (attachment) {
			if (Array.isArray(attachment) && !attachment.length) {
				throw new Error('"options.attachment" must not be empty')
			}
			parsedAttachments = this.parseAttachments(attachment, mirrorAttachment)
		} else {
			throw new Error('"options.attachment" is required')
		}

		let res = {
			...DEFAULT_OPTIONS,
			element: element instanceof $ ? element : $(element),
			target: target instanceof $ ? target : $(target),
			parsedAttachments,
			constrain,
			...rest
		}

		return res
	}

	/** TODO */
	updateOptions(options: AttachmentOptions) {
		this.options = this.processOptions(options)
		this.updatePosition()
	}

	parseAttachments(
		attachment: AttachmentConfig | Array<AttachmentConfig>,
		mirrorAttachment: AttachmentMirrorAxis | void
	): Array<ParsedAttachmentConfig> {
		if (Array.isArray(attachment)) {
			return attachment.map((att) => { return parseAttachmentConfig(att) })
		} else {
			let parsedAttachment = parseAttachmentConfig(attachment)
			let parsedAttachments = [parsedAttachment]
			switch (mirrorAttachment) {
			case 'horiz':
				parsedAttachments.push(mirrorAttachmentConfig(parsedAttachment, 'horiz'))
				break
			case 'vert':
				parsedAttachments.push(mirrorAttachmentConfig(parsedAttachment, 'vert'))
				break
			case 'all':
				parsedAttachments.push(mirrorAttachmentConfig(parsedAttachment, 'vert'))
				parsedAttachments.push(mirrorAttachmentConfig(parsedAttachment, 'horiz'))
				parsedAttachments.push(mirrorAttachmentConfig(parsedAttachment))
				break
			}
			return parsedAttachments
		}
	}

	/** @public TODO */
	updatePosition() {
		// if (!this.options.element.is(':visible') || !this.options.target.is(':visible')) return
		let measurements = readMeasurements(this.options.element, this.options.target)
		let [index, position] = getAttachPosition(measurements, this.options.parsedAttachments,
			this.options.constrain, this.options.viewportPadding)
		if (position) this.setPosition(position)
		if (this.prevAttachmentIndex !== index) {
			// TODO handle mirroring
			if (this.options.onChangeAttachment) this.options.onChangeAttachment(index)
			this.prevAttachmentIndex = index
		}
	}

	setPosition(position: CssPosition) {
		// let css = SUPPORTS_TRANSFORM ?
			// {
				// transform: `translate(${position.left}px, ${position.top}px)`,
				// top: 0, left: 0
			// } :
			// position
		// if (!_.isEqual(css, this.cachedCss)) {
			// this.cachedCss = css
		// this.options.element.css(css)
		// }

		// TODO transform conflicts with animations
		// let css = {
			// transform: `translate(${position.left}px, ${position.top}px)`,
			// top: 0, left: 0
		// }
		let css = position
		this.options.element.css(css)
	}

	// TODO rename
	static listener: () => void;

	static updatedInstances: Set = new Set();

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
