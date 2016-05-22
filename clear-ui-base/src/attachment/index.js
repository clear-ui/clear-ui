import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'

import cloneReferencedElement from '../utils/cloneReferencedElement'
import {ZContextLayer} from '../zContext'
import AttachmentClass from './class'

/**
 * Attaches element to target.
 * It uses ZContext to create separate layer and AttachmentClass for attaching.
 */
export default class Attachment extends React.Component {
	static propTypes = {
		/** Attachment target. */
		children: React.PropTypes.element.isRequired,

		/** Attached element. */
		element: React.PropTypes.element.isRequired,

		/** Controls the visibility of the attached element. */
		open: React.PropTypes.bool,

		/** Function that is called when attachment requests close. */
		onClose: React.PropTypes.func,

		/** Props passed to `ZContextLayer`. */
		layerProps: React.PropTypes.object,

		/**
		 * Configuration of attachment points or a list of possible configs.
		 * Component will choose an attachment that allows element to fit to the viewport.
		 *
		 * Format of the config object is following:
		 *
		 * - **element** `string` – Attachment point of the element.
		 *     String of the form of `vert-attachment horiz-attachment`.
		 *     Attachment value is a number with `px` or `%`.
		 *     Also it supports special values, `vert-attachment` can be
		 *     `'top'`, `'middle'`, `'bottom'`, and `horiz-attachment` can be
		 *     `'left'`, `'right'` and `'center'`.
		 *
		 * - **target** `string` – Attachment point of the target element.
		 *     Format is same as for element.
		 *
		 * - **offset** `string` _optional_ – Offset of the element.
		 *     Format is same as for element and target, but without special values.
		 */
		attachment: React.PropTypes.oneOfType([
			React.PropTypes.array, React.PropTypes.object
		]).isRequired,

		/**
		 * Axis of attachment that can be mirrored to fit element to the viewport.
		 * It is used when single attachment used.
		 * Default is `'none'`.
		 */
		mirrorAttachment: React.PropTypes.oneOf(['all', 'vert', 'horiz', 'none']),

		/** Minimal distance from element to the viewport bound. Default is 0. */
		viewportPadding: React.PropTypes.number,

		/**
		 * When none of attachments allows element to fully fit on the screen,
		 * element is fixed near the edge of the screen.
		 */
		constrain: React.PropTypes.bool,

		/**
		 * Function that is called when component chooses another attachment or
		 * mirrors it to fit attached element on the screen.
		 *
		 * `(index: number, mirrored: object) => void`
		 * - **index** – Index of the chosen attachment config.
		 * - **mirror** – Object with keys `horiz` and `vert` that are `true` when
		 *      attachment is mirrored on that axis.
		 */
		onChangeAttachment: React.PropTypes.func
	}

	componentDidUpdate() {
		if (!this.props.open) this.destroyAttachment()
	}

	componentWillUnmount() {
		this.destroyAttachment()
	}

	render() {
		let element = this.props.element
		let target = this.props.children
		target = cloneReferencedElement(target, {
			key: 'target',
			ref: (ref) => { this.targetRef = ref }
		})

		let layer
		if (this.props.open) {
			element = cloneReferencedElement(element, {ref: (ref) => { this.elementRef = ref }})
			let layerProps = {
				...this.props.layerProps,
				key: 'layer',
				onClose: this.props.onClose,
				onRender: this.onRender.bind(this),
				open: this.props.open
			}
			layer = React.createElement(ZContextLayer, layerProps, element)
		}

		return React.DOM.span(null, [target, layer])
	}

	onRender() {
		let propsOnRender = this.props.layerProps && this.props.layerProps.onRender
		if (propsOnRender) propsOnRender()
		this.setAttachment()
	}

	setAttachment() {
		// TODO when need only update position

		let options = _.pick(this.props, 'attachment', 'viewportPadding', 'constrain',
			'mirrorAttachment', 'onChangeAttachment')
		Object.assign(options, {
			element: ReactDOM.findDOMNode(this.elementRef),
			target: ReactDOM.findDOMNode(this.targetRef),
			// TODO try this
			// originalElementTransform: this.props.target.style && this.props.target.style.transform
		})

		if (this.attachment) {
			this.attachment.updateOptions(options)
		} else {
			this.attachment = new AttachmentClass(options)
		}
	}

	destroyAttachment() {
		if (this.attachment) {
			this.attachment.destroy()
			this.attachment = undefined
		}
	}
}
