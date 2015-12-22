import React from 'react'

import Tappable from '../tappable'
import FocusableTappable from '../focusableTappable'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'

@mixinDecorator(StylesMixin, ChildComponentsMixin)
class MenuItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {rightIconState: 'initial'}
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
			onChangeState: (state) => { this.setState({itemState: state}) },
			preventFocusOnTap: true,
			onFocus: () => { this.setState({focused: true}) },
			onBlur: () => { this.setState({focused: false}) }
		}, this.renderContainer())
	}

	onTap() {
		if (this.state.rightIconState === 'initial' && this.props.onTap) this.props.onTap()
	}
}

export default MenuItem
