export default function isSameOrInheritedType(type, constructor) {
	let proto = type
	while (proto) {
		if (proto === constructor) return true
		proto = Object.getPrototypeOf(proto)
	}
}
