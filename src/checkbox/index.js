import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'

@mixinDecorator(StylesMixin, ChildComponentsMixin)
export default class Checkbox extends React.Component {
	static childComponents = {
		'switch': null
	}

	render() {
		return React.DOM.div({style: this.styles.root},
			React.cloneElement(this.getChildComponent('switch'), {
				...this.props,
				isSwitched: this.props.value,
				onSwitch: this.onChange.bind(this)
			}, this.props.children)
		)
	}

	onChange() {
		if (this.props.onChange) this.props.onChange(!this.props.value)
	}
}
