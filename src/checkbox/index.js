import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'

@mixinDecorator(ChildComponentsMixin)
class Checkbox extends React.Component {
	static childComponents = {
		'switch': null
	}

	render() {
		return React.cloneElement(this.getChildComponent('switch'), {
			...this.props,
			isSwitched: this.props.value,
			onSwitch: this.onChange.bind(this)
		}, this.props.children)
	}

	onChange() {
		if (this.props.onChange) this.props.onChange(!this.props.value)
	}
}

export default Checkbox
