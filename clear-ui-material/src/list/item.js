import React from 'react'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import Icon from 'clear-ui-base/lib/icon'

import theme from '../styles/lightTheme'
import RippleItem from '../menu/rippleItem'
import COLORS from '../styles/colors'

const ICON_SIZE = 24
const AVATAR_SIZE = 38

function getStyles(props, state) {
	const itemTapState = state.rightIconTapState.hovered ?
		{hovered: false, pressed: false} : state.tapState

	const paddingLeft = (props.leftIcon || props.leftAvatar || props.indent) ? 72 : 16
	const paddingRight = (props.rightIcon || props.rightAvatar) ? 72 : 16

	const linesNumber = props.secondaryText ?
		(props.secondaryTextLines === 2 ? 3 : 2) :
		1

	const nestingIndent = 36 * props.nestingLevel

	let paddingTop, paddingBottom
	if (linesNumber === 1) {
		if (props.leftAvatar || props.rightAvatar) {
			paddingTop = 20
			paddingBottom = 20
		} else {
			paddingTop = 16
			paddingBottom = 16
		}
	} else if (linesNumber === 2) {
		paddingTop = 20
		paddingBottom = 16
	} else if (linesNumber === 3) {
		paddingTop = 16
		paddingBottom = 16
	}

	let transition = `all .4s ${TRANSITIONS.strongEaseOut}`

	let root = {
		cursor: 'pointer',
		WebkitTapHighlightColor: 'rgba(0,0,0,0)',
		position: 'relative',
		fontSize: '16px',
		outline: 'none',
		transition
	}

	if (itemTapState.hovered || state.focused) {
		root.background = theme.hovered
	}

	let label = {
		// TODO why not state.theme
		color: theme.text,
		overflowX: 'hidden',
		lineHeight: '16px',
		paddingLeft: paddingLeft + nestingIndent,
		paddingRight: paddingRight,
		paddingTop,
		paddingBottom,
		transition
	}

	let secondaryText = {
		fontSize: '14px',
		lineHeight: '18px',
		marginTop: 4,
		color: theme.secondary
	}

	if (props.disabled) {
		root.cursor = 'default'
		label.color = theme.disabled
		secondaryText.color = theme.disabled
	} else if (props.selected) {
		label.color = theme.primary
	}

	let iconOrAvatar = {
		position: 'absolute',
		lineHeight: '1rem',
		color: theme.secondary,
		fill: theme.secondary,
		transition
	}

	if (linesNumber === 3) {
		iconOrAvatar.top = paddingTop
	} else {
		iconOrAvatar.top = '50%'
		iconOrAvatar.transform = 'translateY(-50%)'
	}

	let opener = props.nestedItems
	let openerTogglesNestedItems = opener && !props.tapTogglesNestedItems

	let leftIcon, rightIcon
	if (props.leftIcon || props.rightIcon || opener) {
		let icon = {
			...iconOrAvatar,
			width: ICON_SIZE,
			height: ICON_SIZE
		}

		if (props.disabled) {
			icon.color = theme.disabled
			icon.fill = theme.disabled
		} else if (props.selected) {
			let color = COLORS.blue500
			icon.color = color
			icon.fill = color
		}

		if (props.leftIcon) leftIcon = {...icon, left: 16 + nestingIndent}

		if (props.rightIcon || opener) {
			rightIcon = {...icon, right: 16}

			if (props.onRightIconTap || openerTogglesNestedItems) {
				Object.assign(rightIcon, {
					padding: 12,
					marginRight: -12,
					borderRadius: '50%',
					zIndex: 1
				})
				if (linesNumber === 3) rightIcon.marginTop = -12
				if (state.rightIconState === 'hovered') {
					rightIcon.background = theme.hovered
				} else if (state.rightIconState === 'active') {
					rightIcon.background = theme.pressed
				}
			}
		}
	}

	let leftAvatar, rightAvatar
	if (props.leftAvatar || props.rightAvatar) {
		let avatar = {
			...iconOrAvatar,
			width: AVATAR_SIZE,
			height: AVATAR_SIZE
		}

		if (props.leftAvatar) leftAvatar = {...avatar, left: 16 + nestingIndent}
		if (props.rightAvatar) rightAvatar = {...avatar, right: 16}
	}

	return {root, label, secondaryText, leftIcon, rightIcon, leftAvatar, rightAvatar}
}

export default class ListItem extends RippleItem {
	static propTypes = {
		...RippleItem.PropTypes,

		/** Avatar element on the left side of the item. */
		leftAvatar: React.PropTypes.node,

		/** Avatar element on the right side of the item. */
		rightAvatar: React.PropTypes.node,

		/** Secondary text under the label of the item. */
		secondaryText: React.PropTypes.node,

		/** Number of lines of the secondary text. */
		secondaryTextLines: React.PropTypes.oneOf([1, 2])
	}

	static defaultProps = {
		...RippleItem.defaultProps,
		secondaryTextLines: 1
	}

	static styles = composeStyles(RippleItem.styles, getStyles)

	static childComponents = composeChildComponents(
		RippleItem.childComponents,
		{
			openerIcon: (props, state) => {
				let icon = state.showNestedItems ?
					Icon.ICONS.triangleUp : Icon.ICONS.triangleDown
				return <Icon icon={icon}/>
			}
		}
	)

	render() { return super.render() } // for react-docgen

	// Adds ripples to the right icon when is has handler, or it is tappable opener icon.
	renderRightIcon() {
		let openerTapTogglesNestedItems = this.props.nestedItems &&
			!this.props.tapTogglesNestedItems
		if (!this.props.disabled && (this.props.onRightIconTap || openerTapTogglesNestedItems)) {
			let tappable = super.renderRightIcon()
			let icon = tappable.props.children
			let iconRipple = React.cloneElement(this.getChildComponent('ripples'), {
				ref: 'iconRipple',
				style: {
					borderRadius: '50%',
					transform: 'translate3d(0,0,0)'
				}
			})
			icon = React.cloneElement(icon, null, [icon.props.children, iconRipple])
			return React.cloneElement(tappable, {
				onTapStart: () => { if (this.refs.iconRipple) this.refs.iconRipple.start() },
				onTapEnd: () => { if (this.refs.iconRipple) this.refs.iconRipple.end() }
			}, icon)
		} else {
			return super.renderRightIcon()
		}
	}

	// Adds secondary text to the label element.
	renderLabel() {
		let label = super.renderLabel()

		if (this.props.secondaryText) {
			let secondaryText = React.DOM.div({
				key: 'secondaryText',
				style: this.styles.secondaryText
			}, this.props.secondaryText)
			return React.cloneElement(label, null, [label.props.children, secondaryText])
		} else {
			return label
		}
	}

	// Adds left and right avatar to the item container element.
	renderItem() {
		let item = super.renderItem()

		let rightAvatar
		if (this.props.rightAvatar) {
			rightAvatar = React.DOM.div({
				key: 'rightAvatar',
				style: this.styles.rightAvatar
			}, this.props.rightAvatar)
		}

		let leftAvatar
		if (this.props.leftAvatar) {
			leftAvatar = React.DOM.div({
				key: 'leftAvatar',
				style: this.styles.leftAvatar
			}, this.props.leftAvatar)
		}

		return React.cloneElement(item, null, [
			leftAvatar, rightAvatar, item.props.children
		])
	}
}
