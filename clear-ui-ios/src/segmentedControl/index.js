import React from 'react'
import Color from 'color'

'a'

import BaseSwitch from 'clear-ui-base/lib/switch'
import RadioButton from 'clear-ui-base/lib/radioButtons/radioButton'
import RadioGroup from 'clear-ui-base/lib/radioButtons/radioGroup'

//@mixin(ThemeMixin)
class SegmentedSwitch extends BaseSwitch {
	static defaultProps = {
		tintColor: '#007aff'
	}

	static styles = (props, state) => {
		const borderRadius = 3
		const tintColor = props.tintColor // || state.theme.tintColor

		let root = {
			display: 'inline-block',
			height: 22,
			lineHeight: '22px',
			fontSize: 12,
			border: `1px solid ${tintColor}`,
			padding: '0 10px',
			cursor: 'pointer',
			outline: 'none'
		}

		if (state.tapState === 'active') {
			root.background = new Color(tintColor).alpha(0.15)
		}

		if (props.isSwitched) {
			root.background = tintColor
			root.color = 'white'
		} else {
			root.color = tintColor
		}

		if (props.first) {
			root.borderTopLeftRadius = 5
			root.borderBottomLeftRadius = 5
		} else if (props.last) {
			root.borderTopRightRadius = 5
			root.borderBottomRightRadius = 5
		}

		if (!props.first) {
			root.marginLeft = -1
		}

		return {root}
	}
}

export class SegmentedControlSegment extends RadioButton {
	static childComponents = {
		switch: <SegmentedSwitch/>
	}
}

export class SegmentedControl extends RadioGroup {
	render() {
		let root = super.render()
		let childrenArray = React.Children.toArray(root.props.children)
		let children = childrenArray.map((elem, index) => {
			if (index === 0) {
				return React.cloneElement(elem, {first: true})
			} else if (index === childrenArray.length - 1) {
				return React.cloneElement(elem, {last: true})
			} else {
				return elem
			}
		})
		return React.cloneElement(root, null, children)
	}
}
