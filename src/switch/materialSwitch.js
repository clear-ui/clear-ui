import React from 'react'
import color from 'color'

import BaseSwitch from 'clear-ui-base/lib/switch'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'
import ThemeMixin from '../themeMixin'
import Ripples from '../ripples'

/**
 * Switch that shows ripples around switchElement
 */
@mixinDecorator(ThemeMixin, ChildComponentsMixin)
class MaterialSwitch extends BaseSwitch {
	static styles = (props, state) => {
		let root = {
			height: 24,
			cursor: 'pointer',
			outline: 'none'
		}

		let switcher = {
			float: 'left',
			width: 24,
			height: 24,
			marginRight: 16,
			position: 'relative'
		}

		let label = {
			fontSize: 15,
			height: 24,
			lineHeight: '24px',
			color: state.theme.text
		}

		let ripples = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			padding: 4,
			top: -4,
			left: -4
		}

		let rippleColor = color(props.isSwitched ? state.theme.primary : state.theme.text)
		let focusRipple = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			padding: 8,
			top: -8,
			left: -8,
			borderRadius: '50%',
			backgroundColor: rippleColor.alpha(0.16),
			opacity: 1,
			transition: `all .4s ${TRANSITIONS.strongEaseOut}`
		}

		if (!state.focused) {
			focusRipple.transform = 'scale(0)'
			focusRipple.opacity = '0'
		}

		if (props.disabled) {
			root.cursor = 'default'
			label.color = state.theme.disabled
		}

		return {root, switcher, label, ripples, focusRipple}
	}

	static childComponents = {
		ripples: (props, state) => {
			let rippleColor = props.isSwitched ? state.theme.primary : state.theme.text
			let styles = {
				root: {overflow: 'visible'}
			}
			return <Ripples color={rippleColor} styles={styles}/>
		}
	}

	render() {
		let tappable = super.render()
		return React.cloneElement(tappable, {
			onTapStart: () => {
				if (!this.state.focused) this.refs.ripples.start()
			},
			onTapEnd: () => { this.refs.ripples.end() }
		})
	}

	renderContainer() {
		return (
			<div style={this.styles.root}>
				<div style={this.styles.switcher}>
					<div style={this.styles.ripples}>
						{React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})}
					</div>
					<div style={this.styles.focusRipple}/>
					{this.renderSwitchElement()}
				</div>
				{
					this.props.children &&
					<div style={this.styles.label}>{this.props.children}</div>
				}
			</div>
		)
	}

	/**
	 * @method
	 * @abstract
	 * @returns {node} Display of the switch state depending of its type.
	 */
	renderSwitchElement() {
		throw new Error('Not implemented')
	}
}

export default MaterialSwitch
