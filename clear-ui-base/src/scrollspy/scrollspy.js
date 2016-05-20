import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import ScrollspyAnchor from './anchor.js'

/** Component for automatically updating value based on scroll position. */
export default class Scrollspy extends React.Component {
	static propTypes = {
		/**
		 * Function that is called when active anchor is changed.
		 * 
		 * `(anchorId) => void`
		 */
		onChange: React.PropTypes.func,

		/** Offset from top when scrolling to anchor, in px */
		offset: React.PropTypes.number,

		/** Distance from top at which anchor elements become active, in px. */
		threshold: React.PropTypes.number,

		/**
		 * Scrollable element to spy on.
		 * It can be DOM-element or React element or deferred resolved to one of it.
		 * When you use element other than `document.body`, be sure to set
		 * `overflow-y: scroll` and `height` to the element.
		 */
		container: React.PropTypes.object
	}

	static defaultProps = {
		offset: 10,
		threshold: 50,
		container: document.body
	}

	componentWillMount() {
		this.childrenWithAnchorsRefs = this.setChildrenAnchorsRefs(this.props.children)
	}

	componentDidMount() {
		// TODO updating container?
		if (typeof this.props.container.then === 'function') {
			this.props.container.then(this.init.bind(this))
		} else {
			this.init(this.props.container)
		}
	}

	componentWillUpdate(nextProps) {
		if (this.props.children !== nextProps.children) {
			this.childrenWithAnchorsRefs = this.setChildrenAnchorsRefs(nextProps.children)
		}
	}

	componentWillUnmmount() {
		this.scrollTarget.unbind(this.scrollListener)
		$(window).unbind(this.resizeListener)
	}

	anchors = []

	render() {
		return <div>{this.childrenWithAnchorsRefs}</div>
	}

	init(container) {
		this.container = $(ReactDOM.findDOMNode(container))
		this.scrollTarget = (this.container[0] === document.body) ?
			$(window) :
			this.container
		this.scrollListener = this.scrollTarget.bind('scroll', this.update.bind(this))
		this.resizeListener = $(window).bind('scroll', this.update.bind(this))
		this.update()
	}

	setChildrenAnchorsRefs(children) {
		let _this = this

		function setAnchorRef(elem) {
			if (elem === null) return elem

			if (elem.type === ScrollspyAnchor) {
				return React.cloneElement(elem, {
					ref: (ref) => { _this.anchors[elem.props.id] = ref }
				})
			}

			if (elem.props && elem.props.children) {
				return React.cloneElement(elem, {
					// TODO why?
					// children: singleChildFixMap(elem.props.children, setAnchorRef)
					children: React.Children.map(elem.props.children, setAnchorRef)
				})
			}

			return elem
		}

		return React.Children.map(children, setAnchorRef)
	}

	update() {
		if (!this.props.onChange) return

		let activeAnchor = this.getActiveAnchor()
		if (this.previousActiveAnchor !== activeAnchor) {
			this.props.onChange(activeAnchor)
			this.previousActiveAnchor = activeAnchor
		}
	}

	getActiveAnchor() {
		let activeId = Object.keys(this.anchors)[0]
		let containerTop = this.container.offset().top
		for (let id in this.anchors) {
			if (!this.anchors[id]) continue // some bug with unmounting
			let elem = $(ReactDOM.findDOMNode(this.anchors[id]))
			let distanceToEdge = elem.offset().top - containerTop
			if (this.container[0] === document.body) {
				distanceToEdge -= this.container.scrollTop()
			}
			if (distanceToEdge > 0 && distanceToEdge < this.props.threshold) return id
			if (distanceToEdge > this.props.threshold) break
			activeId = id
		}
		return activeId
	}

	scrollToAnchor(id) {
		let elem = ReactDOM.findDOMNode(this.anchors[id])
		let topInContainer = $(elem).offset().top - this.container.offset().top
		if (this.container[0] !== document.body) {
			// elem.offset().top already contains body's scrollTop
			topInContainer += this.container.scrollTop()
		}
		this.container.scrollTop(topInContainer - this.props.offset)
	}
}
