import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

//import singleChildFixMap from '../utils/singleChildFixMap'

/**
 * Component for automatically updating value based on scroll position.
 *
 * @param {number} [props.offset=10] - Offset from top when calculating scroll position.
 * @param {number} [props.threshold=100] - Distance from top to activate anchor.
 * @param {Element|ReactElement|Deferred} [props.container=document.body] -
 *    Scrollable element to spy on.
 *    It can be DOM-element or React element or deferred resolved to one of it.
 */
class Scrollspy extends React.Component {
	static propTypes = {
		offset: React.PropTypes.number,
		threshold: React.PropTypes.number,
		container: React.PropTypes.object
	}

	static defaultProps = {
		offset: 10,
		threshold: 100,
		container: document.body
	}

	componentDidMount() {
		// TODO updating container?
		if (typeof this.props.container.then === 'function') {
			this.props.container.then(this.init.bind(this))
		} else {
			this.init(this.props.container)
		}
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

	componentWillUpdate(nextProps) {
		if (this.props.children !== nextProps.children) {
			this.childrenWithAnchorsRefs = undefined
		}
	}

	setChildrenAnchorsRefs() {
		function setAnchorRef(elem) {
			if (elem === null) return elem

			if (elem.type === ScrollspyAnchor) {
				return React.cloneElement(elem, {ref: elem.props.id})
			}

			if (elem.props && elem.props.children) {
				return React.cloneElement(elem, {
					//children: singleChildFixMap(elem.props.children, setAnchorRef)
					children: React.Children.map(elem.props.children, setAnchorRef)
				})
			}

			return elem
		}

		this.childrenWithAnchorsRefs = React.Children.map(this.props.children, setAnchorRef)
	}

	componentWillUnmmount() {
		this.scrollTarget.unbind(this.scrollListener)
		$(window).unbind(this.resizeListener)
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
		let activeId = Object.keys(this.refs)[0]
		let containerTop = this.container.offset().top
		for (let id in this.refs) {
			let elem = $(ReactDOM.findDOMNode(this.refs[id]))
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
		let elem = ReactDOM.findDOMNode(this.refs[id])
		let topInContainer = $(elem).offset().top - this.container.offset().top
		if (this.container[0] !== document.body) {
			// elem.offset().top already contains body's scrollTop
			topInContainer += this.container.scrollTop()
		}
		this.container.scrollTop(topInContainer - this.props.offset)
	}

	render() {
		// Can set refs only inside render
		if (!this.childrenWithAnchorsRefs) this.setChildrenAnchorsRefs()
		//return React.DOM.div({className: this.buildOwnClassName('scrollspy')},
			//this.childrenWithAnchorsRefs)
		return React.DOM.div(null, this.childrenWithAnchorsRefs)
	}
}

class ScrollspyAnchor extends React.Component {
	render() {
		return React.DOM.div(null, this.props.children)
	}
}

Scrollspy.Anchor = ScrollspyAnchor

export default Scrollspy

