import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'

import mixinDecorator from '../utils/mixin/decorator'
import ManagedStateMixin from '../utils/managedStateMixin'
import cloneReferencedElement from '../utils/cloneReferencedElement'
import ZContext from '../zContext'
import AttachmentClass from './class'

/**
 * Attaches element to target.
 * It uses ZContext to create separate layer and AttachmentClass for attaching.
 *
 * @mod {boolean} open
 * @param {object} props.attachment - AttachmentClass option.
 * @param {number} [props.viewportPadding] - AttachmentClass option.
 * @param {string} [props.mirrorAttachment] - AttachmentClass option.
 * @param {function} [props.onChangeAttachment] - AttachmentClass option.
 * @param {object} [props.layerProps] - ZContext.Layer props.
 * @param {React.Element} props.element - Attached element.
 * @param {React.Element} props.children - Attachment target.
 */
@mixinDecorator(ManagedStateMixin)
class Attachment extends React.Component {
	static propTypes = {
		attachment: React.PropTypes.oneOfType([
			React.PropTypes.array, React.PropTypes.object
		]).isRequired,
		onChangeAttachment: React.PropTypes.func,
		element: React.PropTypes.element.isRequired,
		children: React.PropTypes.element.isRequired
	}

	componentDidUpdate() {
		if (!this.state.open) this.destroyAttachment()
	}

	componentWillUnmount() {
		this.destroyAttachment()
	}

	render() {
		let element = this.props.element
		let target = this.props.children
		target = cloneReferencedElement(target, {ref: (ref) => { this.targetRef = ref }})

		let layer
		if (this.state.open) {
			element = cloneReferencedElement(element, {ref: (ref) => { this.elementRef = ref }})
			let layerProps = {
				...this.props.layerProps,
				onSetMod: { // FIXME
					open: (val) => { this.setManagedState({open: val}) }
				},
				onRender: this.onRender.bind(this),
				state: {open: this.state.open}
			}
			layer = React.createElement(ZContext.Layer, layerProps, element)
		}

		return React.DOM.span(null, [target, layer])
	}

	onRender() {
		let origOnRender = this.props.layerProps && this.props.layerProps.onRender
		if (origOnRender) origOnRender()
		this.setAttachment()
	}

	setAttachment() {
		// TODO when need only update position

		let options = _.pick(this.props, 'attachment', 'viewportPadding', 'mirrorAttachment',
			'onChangeAttachment')
		Object.assign(options, {
			element: ReactDOM.findDOMNode(this.elementRef),
			target: ReactDOM.findDOMNode(this.targetRef)
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

export default Attachment
