import React from 'react'
import shallowEqual from 'shallowequal'

import Attachment from '../attachment'
import BoundFunction, {funcOrBoundFuncType} from '../utils/boundFunction'
import Tappable, {FocusableTappable} from '../tappable'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'

/**
 * Styleable elements:
 * - root
 * - label
 * - rightIcon
 * - leftIcon
 */
@mixin(StylesMixin, ManagedStateMixin)
export default class MenuItem extends React.Component {
	static displayName = 'MenuItem'

	static propTypes = {
		/** Value of the item. */
		value: React.PropTypes.any,

		/** Disabled state of the item. */
		disabled: React.PropTypes.bool,

		/**
		 * Handler of the tap event on the item.
		 * This property is set automatically,
		 * instead you should use `onSelect` prop of the `Menu`.
		 */
		onTap: funcOrBoundFuncType,

		/** When `true`, item can be focused using `Tab` key. */
		focusable: React.PropTypes.bool,

		/**
		 * Icon element that appears at the left side of the item.
		 * It can be SVG-icon, font-icon or any arbitrary element.
		 */
		leftIcon: React.PropTypes.element,

		/** Icon element that appears at the right side of the item. */
		rightIcon: React.PropTypes.element,

		/** Handler of the tap event on the right icon. */
		onRightIconTap: React.PropTypes.func,
	}

	constructor(props) {
		super(props)
		this.state = {
			rightIconTapState: {hovered: false, pressed: false},
			tapState: {hovered: false, pressed: false}
		}
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

	render() {
		let tappableType = this.props.focusable ? FocusableTappable : Tappable
		return React.createElement(tappableType, {
			tabIndex: this.props.tabIndex,
			disabled: this.props.disabled,
			onTap: this.onTap.bind(this),
			onChangeTapState: (tapState) => { this.setManagedState({tapState}) },
			preventFocusOnTap: true,
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderItem())
	}

	renderItem() {
		return (
			<div style={this.styles.root}>
				{this.renderLeftIcon()}
				{this.renderLabel()}
				{this.renderRightIcon()}
			</div>
		)
	}

	renderLabel() {
		return <div style={this.styles.label} key='label'>{this.props.children}</div>
	}

	renderLeftIcon() {
		if (this.props.leftIcon) {
			return (
				<div key='leftIcon' style={this.styles.leftIcon}>
					{this.props.leftIcon}
				</div>
			)
		}
	}

	renderRightIcon() {
		if (this.props.rightIcon) {
			let icon = <div key='rightIcon' style={this.styles.rightIcon}>{this.props.rightIcon}</div>

			if (this.props.onRightIconTap && !this.props.disabled) {
				icon = React.createElement(Tappable, {
					key: 'rightIcon',
					onTap: this.props.onRightIconTap,
					onChangeTapState: (tapState) => {
						this.setState({rightIconTapState: tapState})
					}
				}, icon)
			}

			return icon
		}
	}

	onTap() {
		if (this.props.onTap && !this.state.rightIconTapState.hovered) {
      BoundFunction.call(this.props.onTap)
		}
	}
}
