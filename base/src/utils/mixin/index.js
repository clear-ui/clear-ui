function cloneProto(proto) {
	let clone = Object.create(Object.getPrototypeOf(proto))
	let keys = Object.getOwnPropertyNames(proto)
	for (let i in keys) {
		let key = keys[i]
		clone[key] = proto[key]
	}
	return clone
}

/**
 * Mixes methods and properties from mixins to target's prototype.
 * Mixed methods can call super method with `this.__super()`.
 * Super is available only synchronously.
 * Mixins can have constructors in the `__constructor` property.
 *
 * @param target {function} - Constructor.
 * @param ...mixins {array<object>} - Mixins.
 * @return {function} - New constructor with mixins.
 */
export default function(target, ...mixins) {
	class MixinClass extends target {}

	for (let mixin of mixins) {
		for (let key in mixin) {
			let value = mixin[key]
			if (typeof value === 'function') {
				let base = MixinClass.prototype[key] || function() {}
				let mixed = value
				value = function() {
					var superSaved = this.__super
					this.__super = base
					var res = mixed.apply(this, arguments)
					this.__super = superSaved
					return res
				}
			}
			MixinClass.prototype[key] = value
		}
	}

	return MixinClass
}
