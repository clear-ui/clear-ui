import React from 'react'

import BaseCheckbox from 'clear-ui-base/lib/checkbox'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import Icon from 'clear-ui-base/lib/icon'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import ThemeMixin from '../themeMixin'
import Ripples from '../ripples'

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

		let icon = {
			width: 24,
			height: 24,
			position: 'absolute',
			left: 0,
			right: 0,
			fill: props.value ? state.theme.primary : state.theme.text
		}

		let label = {
			fontSize: 15,
			height: 24,
			lineHeight: '24px',
			color: state.theme.text
		}

		if (props.disabled) {
			root.cursor = 'default'
			label.color = state.theme.disabled
			icon.fill = state.theme.disabled
		}

		return {root, box, icon, label}
	}

	static childComponents = {
		ripples: <Ripples/>
	}

	//render() {
		//let tappable = super.render()
		//return React.cloneElement(tappable, {
			////onTapStart: () => { this.refs.ripples.start() },
			////onTapEnd: () => { this.refs.ripples.end() }
		//})
	//}

	renderContainer() {
		let label
		if (this.props.children) {
			label = React.DOM.div({style: this.styles.label}, this.props.children)
		}

		let icon = React.DOM.div({style: this.styles.box}, [
			React.DOM.div({style: this.styles.icon},
				React.createElement(Icon, {icon: checkboxOutlineIcon})),
			this.props.value && React.DOM.div({style: this.styles.icon},
				React.createElement(Icon, {icon: checkboxIcon}))
			//React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})
		])

		return React.DOM.div({style: this.styles.root}, [icon, label])
	}
}

export default Checkbox
