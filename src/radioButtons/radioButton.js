import React from 'react'

import mixinDecorator from '../utils/mixin/decorator'
import ChildComponentsMixin from '../utils/childComponentsMixin'

@mixinDecorator(ChildComponentsMixin)
class RadioButton extends React.Component {
	static propTypes = {
		value: React.PropTypes.bool,
		onSelect: React.PropTypes.func
	}

	static defaultProps = {
		preventFocusOnTap: true
	}

	render() {
		return React.cloneElement(this.getChildComponent('switch'), {
			...this.props,
			isSwitched: this.props.selected,
			onSwitch: this.props.onSelect
		}, this.props.children)
	}
}

export default RadioButton
