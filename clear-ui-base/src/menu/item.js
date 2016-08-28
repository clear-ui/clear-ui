import React from 'react'
import shallowEqual from 'shallowequal'

import Attachment from '../attachment'
import BoundFunction, {funcOrBoundFuncType, shouldComponentUpdate} from '../utils/boundFunction'
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

		nestingLevel: React.PropTypes.number 
	}

	static defaultProps = {
		nestingLevel: 0
	}

	constructor(props) {
		super(props)
		this.state = {
			rightIconTapState: {hovered: false, pressed: false},
			tapState: {hovered: false, pressed: false}
		}
		this.initManagedState(['tapState'])
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shouldComponentUpdate(
			this.props, this.state,
			nextProps, nextState,
			['onTap', 'onChangeTapState']
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
