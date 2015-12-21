// Composes `childBlocks` props.
// If children uses functions, they are combined to single one, that calls all
// functions in turn and passes result of each function to the next one.
export default function composeChildComponents(...childComponentsList) {
	let composed = {}
	for (let i in childComponentsList) {
		let childComponents = childComponentsList[i]
		for (let name in childComponents) {
			let oldComponent = composed[name]
			let newComponent = childComponents[name]
			if (typeof newComponent === 'function') {
				composed[name] = (props, state, defaultComponent) => {
					let oldComponentResult = (typeof oldComponent === 'function') ?
						oldComponent(props, styles, defaultComponent) :
						oldComponent
					return newComponent(props, state, oldComponentResult)
				}
			} else {
				composed[name] = newComponent
			}
		}
	}
	return composed
}
