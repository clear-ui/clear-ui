// Composes `onSetMod` props.
// If there are several handlers for some mod, they are combined
// to single one that calls all handlers in turn.
export default function composeOnChangeState(...onChangeStateList) {
	let composed = {}
	for (let i in onChangeStateList) {
		let onChangeState = onChangeStateList[i]
		for (let key in onChangeState) {
			let oldHandler = composed[key]
			let handler = onSetMod[key]
			if (oldHandler) {
				composed[key] = (value) => {
					oldHandler(value)
					handler(value)
				}
			} else {
				composed[key] = handler
			}
		}
	}
	return composed
}
