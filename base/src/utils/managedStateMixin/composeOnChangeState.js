import BoundFunction from '../boundFunction'

function callHandler(handler, value) {
	if (handler instanceof BoundFunction) handler.call(value)
	else if (typeof handler === 'function') handler(value)
}

// Composes `onChangeState` props.
// If there are several handlers for some state, they are combined
// to single one that calls all handlers in turn.
export default function composeOnChangeState(...onChangeStateList) {
	let composed = {}
	for (let i in onChangeStateList) {
		let onChangeState = onChangeStateList[i]
		for (let key in onChangeState) {
			let oldHandler = composed[key]
			let handler = onChangeState[key]
			if (oldHandler) {
				composed[key] = (value) => {
					callHandler(oldHandler, value)
					callHandler(handler, value)
				}
			} else {
				composed[key] = handler
			}
		}
	}
	return composed
}
