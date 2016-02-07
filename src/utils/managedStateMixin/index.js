import React from 'react'

import BoundFunction from '../boundFunction'

export let ManagedStateMixinPropTypes = {
	state: React.PropTypes.object,
	onChangeState: React.PropTypes.objectOf(
		React.PropTypes.oneOfType(
			React.PropTypes.func,
			React.PropTypes.instanceOf(BoundFunction)
		)
	)
}

export default {
	componentWillMount() {
		this.state = {...this.state, ...this.props.defaultState, ...this.props.state}
		this.__super()
	},

	componentWillReceiveProps(nextProps) {
		this.__super(...arguments)
		if (nextProps.state) this.setState(nextProps.state)
	},

	setManagedState(state) {
		let controlled = {}
		let uncontrolled = {}
		for (let key in state) {
			if (this.props.state && key in this.props.state) controlled[key] = state[key]
			else uncontrolled[key] = state[key]
		}
		this.setState(uncontrolled)
		this.callOnChangeState(controlled)
	},

	callOnChangeState(state) {
		if (this.props.onChangeState) {
			for (let key in state) {
				let value = state[key]
				let handler = this.props.onChangeState[key]
				if (handler) {
					if (handler instanceof BoundFunction) handler.call(value)
					else if (typeof handler === 'function') handler(value)
				}
			}
		}
	}
}
