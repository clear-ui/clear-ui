import BoundFunction from '../boundFunction'

function capitalizeFirstLetter(str) {
	return str[0].toUpperCase() + str.slice(1)
}

/**
 * Mixin that allows props of the component to be used as controlled and uncontrolled
 * depending on the needs.
 *
 * Uncontrolled props are part of component's `state`.
 *
 * Controlled props are part of the `props`. Rendered component always reflects values
 * of that props. In that case component can't change that values by itself,
 * instead of that it calls callbacks to notify owner component about changes.
 *
 * To initialize managed props, you should call method `initManagedProps(propsNames)`.
 * Then if one of that prop names will be found in the `props`, it will become controlled, and
 * its value will be copied to the `state` on each update of the component.
 *
 * To change value of a managed prop, you should use method `setManagedState`
 * instead of `setState`. With uncontrolled props it works as usual `setState`,
 * but for controlled props it calls callbacks from `props` with names `onChange<propName>`.
 *
 * Also, you can provide an initial value of the prop with `initial<propName>`.
 */
export default {
	initManagedState(propsNames) {
		this.managedProps = propsNames
	},

	getManagedPropsValues(props, initial) {
		let values = {}
		for (let i in this.managedProps) {
			let propName = this.managedProps[i]
			let initialPropName = 'initial' + capitalizeFirstLetter(propName)
			if (initial && initialPropName in props) {
				values[propName] = props[initialPropName]
			}
			if (propName in props) values[propName] = props[propName]
		}
		return values
	},

	componentWillMount() {
		let managedPropsValues = this.getManagedPropsValues(this.props, true)
		this.state = {...this.state, ...managedPropsValues}
		this.__super()
	},

	componentWillReceiveProps(nextProps) {
		this.__super(...arguments)
		this.setState(this.getManagedPropsValues(nextProps))
	},

	setManagedState(state) {
		let uncontrolled = {}
		for (let key in state) {
			if (!(key in this.props)) uncontrolled[key] = state[key]
		}
		this.setState(uncontrolled)
		this.callOnChangeState(state)
	},

	callOnChangeState(state) {
		for (let propName in state) {
			let value = state[propName]
			let handlerName = 'onChange' + capitalizeFirstLetter(propName)
			let handler = this.props[handlerName]
			if (handler) {
				if (handler instanceof BoundFunction) handler.call(value)
				else if (typeof handler === 'function') handler(value)
			}
		}
	}
}
