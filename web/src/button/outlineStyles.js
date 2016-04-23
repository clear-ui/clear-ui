import COLORS from '../styles/colors'

let outlineStyle = {
	position: 'absolute',
	zIndex: 2,
	borderRadius: 1,
	top: 1,
	left: 1,
	bottom: 1,
	right: 1
}

export function getWhitelineStyle() {
	return {
		...outlineStyle,
		boxShadow: '0 0 0 1px rgba(255,255,255,.75) inset',
	}
}

export function getOuterOutlineStyle(focused, invalid) {
	if (focused || invalid) {
		let width = focused ? 2 : 1
		let color = invalid ? COLORS.red : COLORS.blue
		return {
			...outlineStyle,
			boxShadow: `0 0 0 ${width}px ${color}`
		}
	} else {
		return {}
	}
}
