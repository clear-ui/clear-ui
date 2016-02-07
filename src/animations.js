import React from 'react'

export default class Animation extends React.Component {
	static propTypes = {
		progress: React.PropTypes.number.isRequired,
		fn: React.PropTypes.func.isRequired,
		params: React.PropTypes.object,
		children: React.PropTypes.element
	}

	render() {
		let elem = this.props.children
		let style = this.props.fn({
			originalStyle: elem.props.style,
			progress: this.props.progress,
			...this.props.params
		})
		return React.cloneElement(elem, {style})
	}
}

export function fade({originalStyle, progress}) {
	let opacity = (originalStyle && originalStyle.opacity) || 1
	opacity *= progress
	return {...originalStyle, opacity}
}

export function slide({originalStyle, side = 'top', distance = 10, progress}) {
	let transform = ''
	if (originalStyle && originalStyle.transform) transform += originalStyle.transform + ' '
	let translate = Math.round(distance * (1 - progress))
	switch (side) {
	case 'top': transform += `translateY(${translate}px)`; break
	case 'bottom': transform += `translateY(${-translate}px)`; break
	case 'left': transform += `translateX(${translate}px)`; break
	case 'right': transform += `translateX(${-translate}px)`; break
	}
	return {...originalStyle, transform}
}

export function fadeAndSlide({originalStyle, side, distance, progress}) {
	return slide({
		originalStyle: fade({originalStyle, progress}),
		side, distance, progress
	})
}

export function scale({originalStyle, origin, initialScale = 0.5, progress}) {
	let transform = ''
	if (originalStyle && originalStyle.transform) transform += originalStyle.transform + ' '
	let scale = initialScale + progress * (1 - initialScale)
	transform += `scale(${scale})`
	let style = {...originalStyle, transform}
	if (origin) style.transformOrigin = origin
	return style
}

export function fadeAndScale({originalStyle, origin, initialScale, progress}) {
	return scale({
		originalStyle: fade({originalStyle, progress}),
		origin, initialScale, progress
	})
}
