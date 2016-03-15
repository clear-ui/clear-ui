import React from 'react'
import shallowEqual from 'shallowequal'

import BoundFunction from '../utils/boundFunction'
import Tappable from '../tappable'
import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'

const funcOrBoundFuncType = React.PropTypes.oneOfType(
	React.PropTypes.func,
	React.PropTypes.instanceOf(BoundFunction)
)

@mixinDecorator(StylesMixin, ManagedStateMixin)
class MenuItem extends React.Component {
	static displayName = 'MenuItem'

	static propTypes = {
		onTap: funcOrBoundFuncType

		// TODO
		// other props
	}

	constructor(props) {
		super(props)
		this.state = {rightIconTapState: 'initial', tapState: 'initial'}
		this.initManagedState(['tapState'])
	}

	/**
	 * Menu stores currently hovered element in its state, so every time hover is moved,
	 * menu runs rerender, that causes rerender of all items. That's why items need
	 * shouldComponentUpdate.
	 * Items can not use simple PureRenderMixin, because it can not compare
	 * function props created using 'Function.bind()', because it returns new
	 * function every time.
	 * This function can compare function props correctly when they use class 'BoundFunction'
	 * instead of 'Function.bind()', that supports comparing with method
	 * 'BoundFunction.compare(a, b)'.
	 */
	shouldComponentUpdate(nextProps, nextState) {
		function compareFunctionProp(a, b) {
			if (a instanceof BoundFunction && b instanceof BoundFunction) {
				return BoundFunction.compare(a, b)
			} else {
				return a === b
			}
		}

		const functionProps = ['onTap', 'onChangeTapState']

		return !(
			shallowEqual(this.props, nextProps, (a, b, key) => {
				// undefined key means comparing the objects themselves
				if (key === undefined) return undefined

				if (functionProps.indexOf(key) !== -1) return compareFunctionProp(a, b)
				else return a === b
			}) &&
			shallowEqual(this.state, nextState)
		)
	}

	renderLabel() {
		return React.DOM.div({
			key: 'label',
			style: this.styles.label
		}, this.props.children)
	}

	renderContainer() {
		let leftIcon, rightIcon

		if (this.props.leftIcon) {
			leftIcon = React.DOM.div({
				key: 'leftIcon',
				style: this.styles.leftIcon
			}, this.props.leftIcon)
		}

		if (this.props.rightIcon) {
			rightIcon = React.DOM.div({
				key: 'rightIcon',
				style: this.styles.rightIcon
			}, this.props.rightIcon)
			if (this.props.onRightIconTap && !this.props.disabled) {
				rightIcon = React.createElement(Tappable, {
					key: 'rightIcon',
					onTap: this.props.onRightIconTap,
					onChangeTapState: ({hovered, pressed}) => {
						this.setState({
							rightIconTapState: pressed ? 'active' :
								(hovered ? 'hovered' : 'initial')
						})
					}
				}, rightIcon)
			}
		}

		return React.DOM.div({style: this.styles.root}, [
			leftIcon, this.renderLabel(), rightIcon
		])
	}

	render() {
		return React.createElement(FocusableTappable, {
			tabIndex: this.props.tabIndex,
			disabled: this.props.disabled,
			onTap: this.onTap.bind(this),
			onChangeTapState: ({hovered, pressed}) => {
				this.setManagedState({
					tapState: pressed ? 'active' : (hovered ? 'hovered' : 'initial')
				})
			},
			preventFocusOnTap: true,
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderContainer())
	}

	onTap() {
		if (this.props.onTap && this.state.rightIconTapState === 'initial') {
			let handler = this.props.onTap
			if (handler instanceof BoundFunction) handler.call()
			else if (typeof handler === 'function') handler()
		}
	}
}

export default MenuItem
