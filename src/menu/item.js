import React from 'react'
import shallowEqual from 'shallowequal'

import BoundFunction from '../utils/boundFunction'
import Tappable from '../tappable'
import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin, {ManagedStateMixinPropTypes} from '../utils/managedStateMixin'

@mixinDecorator(StylesMixin, ManagedStateMixin)
class MenuItem extends React.Component {
	static displayName = 'MenuItem'

	static propTypes = {
		...ManagedStateMixinPropTypes,

		onTap: React.PropTypes.oneOfType(
			React.PropTypes.func,
			React.PropTypes.instanceOf(BoundFunction)
		)

		// TODO
		// other props
	}

	constructor(props) {
		super(props)
		this.state = {rightIconState: 'initial'}
	}

	/**
	 * Menu stores currently hovered element in its state, so every time hover is moved,
	 * menu runs rerender, that causes rerender of all items. That's why items need
	 * shouldComponentUpdate.
	 * Items can not use simple PureRenderMixin, because it can not compare nested
	 * properties (ManagedStateMixin props - 'state' and 'onChangeState'), and
	 * function-properties created using 'Function.bind()', because it returns new
	 * function every time.
	 * This function compares nested properties separately, and uses class 'BoundFunction'
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

		return !(
			shallowEqual(this.props, nextProps, (a, b, key) => {
				// undefined key mean comparing the objects themselves
				if (key === undefined) return undefined

				if (key === 'state') return shallowEqual(a, b)
				if (key === 'onChangeState') {
					return shallowEqual(a, b, (_a, _b, _key) => {
						if (_key === undefined) return undefined
						return compareFunctionProp(_a, _b)
					})
				}

				if (key === 'onTap') return compareFunctionProp(a, b)

				return a === b
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
			if (this.props.onRightIconClick && !this.props.disabled) {
				rightIcon = React.createElement(Tappable, {
					key: 'rightIcon',
					onTap: this.props.onRightIconClick,
					onChangeState: (state) => { this.setState({rightIconState: state}) }
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
			onChangeState: (state) => { this.setManagedState({itemState: state}) },
			preventFocusOnTap: true,
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderContainer())
	}

	onTap() {
		if (this.state.rightIconState === 'initial' && this.props.onTap) {
			let handler = this.props.onTap
			if (handler instanceof BoundFunction) handler.call()
			else if (typeof handler === 'function') handler()
		}
	}
}

export default MenuItem
