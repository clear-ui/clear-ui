import React from 'react'

import BaseCheckbox from 'clear-ui-base/lib/checkbox'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import Icon from 'clear-ui-base/lib/icon'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import ThemeMixin from '../themeMixin'
import Ripples from '../ripples'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'

import checkboxIcon from './checkbox.icon.svg'
import checkboxOutlineIcon from './checkboxOutline.icon.svg'

@mixinDecorator(ThemeMixin, ChildComponentsMixin)
class Checkbox extends BaseCheckbox {
	static styles = (props, state) => {
		let root = {
			height: 24,
			cursor: 'pointer',
			outline: 'none'
		}

		let box = {
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

		let ripplesContainer = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			padding: 4,
			top: -4,
			left: -4
		}

		let icon = {
			width: 24,
			height: 24,
			position: 'absolute',
			left: 0,
			right: 0,
			opacity: 1,
			fill: props.value ? state.theme.primary : state.theme.text,
			transition: `all .4s ${TRANSITIONS.strongEaseOut}`
		}

		let outlineIcon = {...icon}
		let checkmarkIcon = {...icon}

		if (!props.value) {
			checkmarkIcon.opacity = 0
			checkmarkIcon.transform = 'scale(0)'
		}

		if (props.disabled) {
			root.cursor = 'default'
			label.color = state.theme.disabled
			checkmarkIcon.fill = state.theme.disabled
			outlineIcon.fill = state.theme.disabled
			if (props.value) outlineIcon.display = 'none'
		}

		return {root, box, outlineIcon, checkmarkIcon, label, ripplesContainer}
	}

	static childComponents = {
		ripples: (props, state) => {
			let color = props.value ? state.theme.primary : state.theme.text
			let styles = {
				root: {overflow: 'visible'}
			}
			return <Ripples color={color} styles={styles}/>
		}
	}

	render() {
		let tappable = super.render()
		return React.cloneElement(tappable, {
			onTapStart: () => { this.refs.ripples.start() },
			onTapEnd: () => { this.refs.ripples.end() }
		})
	}

	renderContainer() {
		return (
			<div style={this.styles.root}>
				<div style={this.styles.box}>
					<div style={this.styles.ripplesContainer}>
						{React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})}
					</div>
					<div style={this.styles.outlineIcon}>
						<Icon icon={checkboxOutlineIcon}/>
					</div>
					<div style={this.styles.checkmarkIcon}>
						<Icon icon={checkboxIcon}/>
					</div>
				</div>
				{
					this.props.children &&
					<div style={this.styles.label}>{this.props.children}</div>
				}
			</div>
		)
	}
}

export default Checkbox
