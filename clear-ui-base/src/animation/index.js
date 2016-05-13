import React from 'react'

/** Component that renders showing and hiding state of the element. */
export default class Animation extends React.Component {
	static propTypes = {
		/** Animated element. */
		children: React.PropTypes.element,

		/** Progress of the animation, number from 0 to 1. */
		progress: React.PropTypes.number.isRequired,

		/**
		 * Animation function.
		 *
		 * `({progress, originalStyle, ...params}) => newStyle:object`
		 */
		fn: React.PropTypes.func.isRequired,

		/** Additional params passed to the animation function */
		params: React.PropTypes.object
	}

	render() {
		let elem = this.props.children
		let style = this.props.fn({
			originalStyle: elem.props.style,
			progress: this.props.progress,
			...this.props.params
		})
		return React.cloneElement(elem, {style})
	}
}
