import React from 'react'

import mixin from '../utils/mixin'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import FocusableTappable from '../focusableTappable'

class Button extends React.Component {
	static propTypes = {
		disabled: React.PropTypes.bool,
		//tabIndex: ?
		onTap: React.PropTypes.func
	}

	renderContainer() {
		let label = React.DOM.div({
			key: 'label',
			style: this.styles.label
		}, this.props.children)

		let elemType = this.props.tabIndex === undefined ? 'div' : 'button'
		return React.DOM[elemType]({
			style: this.styles.root,
			disabled: this.props.disabled
		}, label)
	}

	render() {
		return React.createElement(FocusableTappable, {
			disabled: this.props.disabled,
			tabIndex: this.props.tabIndex,
			onTap: this.props.onTap,
			preventFocusOnTap: true,
			onChangeState: (state) => { this.setManagedState({state}) },
			onFocus: () => { this.setManagedState({focused: true}) },
			onBlur: () => { this.setManagedState({focused: false}) }
		}, this.renderContainer())
	}
}

export default mixin(Button, StylesMixin, ManagedStateMixin, ChildComponentsMixin)
