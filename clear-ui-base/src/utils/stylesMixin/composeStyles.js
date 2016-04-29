/**
 * Composes `styles` props for each element.
 * If styles uses functions, they are combined
 * to single function that returns merged results.
 */
export default function composeStyles(...stylesList) {
	return function(props, state) {
		let composed = {}
		for (let i in stylesList) {
			let styles = stylesList[i]
			let result = typeof styles === 'function' ? styles(props, state) : styles
			for (let item in result) {
				if (composed[item] === undefined) composed[item] = {}
				Object.assign(composed[item], result[item])
			}
		}
		return composed
	}
}
