import React from 'react'

import BaseSelect from 'clear-ui-base/lib/select'
import Icon from 'clear-ui-base/lib/icon'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themes/themeMixin'
import DropdownMenu from '../dropdownMenu'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'

@mixinDecorator(ThemeMixin)
export default class Select extends BaseSelect {
	static propTypes = {
		...BaseSelect.propTypes,

		/** */
		desktop: React.PropTypes.bool,

		/** Max height of menu. */
		maxHeight: React.PropTypes.number
	}

	static styles = (props, state) => {
		let trigger = {
			fontSize: props.desktop ? 15 : 16,
			lineHeight: '48px',
			cursor: 'pointer',
			position: 'relative',
			paddingRight: 24,
			color: state.theme.text,
			outline: 'none',
			userSelect: 'none',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)' // mobile
		}

		let underline = {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 8,
			transition: `border-color .4s ${TRANSITIONS.strongEaseOut}`
		}

		let triangleIcon = {
			position: 'absolute',
			width: 24,
			height: 24,
			right: 0,
			top: 12,
			fill: state.theme.secondary
		}

		let label = {
			color: state.theme.disabled
		}

		if (props.disabled) {
			underline.borderBottom = `2px dotted ${state.theme.disabled}`
			trigger.cursor = 'default'
			trigger.color = state.theme.disabled
			triangleIcon.fill = state.theme.disabled
		} else {
			if (state.focused) underline.borderBottom = `2px solid ${state.theme.primary}`
			else underline.borderBottom = `1px solid ${state.theme.dividers}`
		}

		return {trigger, underline, triangleIcon, label}
	}

	static childComponents = {
		dropdownMenu: (props) => {
			return <DropdownMenu
				styles={{trigger: {outline: 'none'}}}
				maxHeight={props.maxHeight}
				desktop={props.desktop}
				animation='scaleVert'
			/>
		}
	}

	renderTrigger() {
		let trigger = (
			<div style={this.styles.trigger}>
				{this.renderTriggerContent()}
				<div style={this.styles.underline}/>
				<div style={this.styles.triangleIcon}>
					<Icon icon={Icon.ICONS.triangleDown}/>
				</div>
			</div>
		)

		return trigger
	}
}
