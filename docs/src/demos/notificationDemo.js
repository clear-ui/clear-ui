import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'

@mixin(ChildComponentsMixin)
export default class NotificationDemo extends React.Component {
	static defaultProps = {
		buttonText: 'Show notification',
		children: 'Notification text'
	}

	static childComponents = {
		button: undefined,
		notification: undefined
	}

	constructor() {
		super()
		this.state = {}
	}

	render() {
		let button = React.cloneElement(this.getChildComponent('button'), {
			onTap: () => { this.setState({open: true}) }
		}, this.props.buttonText)

		let notification = React.cloneElement(this.getChildComponent('notification'), {
			open: this.state.open,
			onClose: () => { this.setState({open: false}) },
			autoHideTimeout: 3000,
			...this.props
		})

		return <span>{button}{notification}</span>
	}
}
