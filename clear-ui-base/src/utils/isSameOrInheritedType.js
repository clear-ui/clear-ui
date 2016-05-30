export default function isSameOrInheritedType(type, constructor) {
	if (!type) return
	let proto = type.prototype
	while (proto) {
		if (proto.constructor === constructor) return true
		proto = Object.getPrototypeOf(proto)
	}
}
