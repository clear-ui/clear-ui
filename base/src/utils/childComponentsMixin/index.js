export default {
	getChildComponent(name) {
		let defaultComponent = this.constructor.childComponents &&
			this.constructor.childComponents[name]
		if (typeof defaultComponent === 'function') {
			defaultComponent = defaultComponent(this.props, this.state)
		}

		let componentProp = this.props.childComponents && this.props.childComponents[name]
		if (componentProp === undefined) {
			return defaultComponent
		} else if (typeof componentProp === 'function') {
			return componentProp(this.props, this.state, defaultComponent)
		} else {
			return componentProp
		}
	}
}
