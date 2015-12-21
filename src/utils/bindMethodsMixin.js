export default {
	bindMethods(...methods) {
		methods.forEach((method) => { this[method] = this[method].bind(this) })
	}
}
