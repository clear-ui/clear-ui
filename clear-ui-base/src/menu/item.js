import React from 'react'
import shallowEqual from 'shallowequal'

import BoundFunction from '../utils/boundFunction'
import Tappable, {FocusableTappable} from '../tappable'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'

const funcOrBoundFuncType = React.PropTypes.oneOfType([
	React.PropTypes.func,
	React.PropTypes.instanceOf(BoundFunction)
])

/**
 * Styleable elements:
 * - root
 * - label
 * - rightIcon
 * - leftIcon
 * - subMenu
 */
@mixin(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
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

		/** An array of items nested inside of the current item. */
		nestedItems: React.PropTypes.node,

		/**
		 * When `true`, nested list can be opened by tapping on the item itself,
		 * not only by tapping on the opener icon.
		 */
		tapTogglesNestedItems: React.PropTypes.bool,

		/** Property that is used internally by `Menu` component. */
		nestingLevel: React.PropTypes.number
	}

	static defaultProps = {
		nestingLevel: 0
	}

	static childComponents = {
		/** Right icon for items with nested items. */
		openerIcon: undefined
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
		let item = this.renderTappable()
		if (this.props.nestedItems) {
			let subMenu
			if (this.state.showNestedItems) {
				subMenu = (
					<div key='subMenu' style={this.styles.subMenu}>
						{this.props.nestedItems}
					</div>
				)
			}

			return <div>{item}{subMenu}</div>
		} else {
			return item
		}
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
		if (this.props.rightIcon || this.props.nestedItems) {
			let content, handler
			if (this.props.nestedItems) {
				content = this.getChildComponent('openerIcon')
				if (!this.props.tapTogglesNestedItems) handler = this.toggleNestedItems.bind(this)
			} else {
				content = this.props.rightIcon
				handler = this.props.onRightIconTap
			}

			let icon = <div key='rightIcon' style={this.styles.rightIcon}>{content}</div>

			if (handler && !this.props.disabled) {
				icon = React.createElement(Tappable, {
					key: 'rightIcon',
					onTap: handler,
					onChangeTapState: (tapState) => {
						this.setState({rightIconTapState: tapState})
					}
				}, icon)
			}

			return icon
		}
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

	renderTappable() {
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

	toggleNestedItems() {
		this.setState({showNestedItems: !this.state.showNestedItems})
	}

	onTap() {
		if (this.props.tapTogglesNestedItems) {
			this.toggleNestedItems()
		} else if (this.props.onTap && !this.state.rightIconTapState.hovered) {
			let handler = this.props.onTap
			if (handler instanceof BoundFunction) handler.call()
			else if (typeof handler === 'function') handler()
		}
	}
}
