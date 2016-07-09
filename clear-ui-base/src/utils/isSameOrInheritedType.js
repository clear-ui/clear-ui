export default function isSameOrInheritedType(type, baseType) {
	if (!type) return
	return type === baseType || type.prototype instanceof baseType
}
