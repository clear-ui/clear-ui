export function fade({originalStyle, progress}) {
	let opacity = (originalStyle && originalStyle.opacity) || 1
	opacity *= progress
	return {...originalStyle, opacity}
}

export function slide({originalStyle, side = 'top', distance = 10, unit = 'px', progress}) {
	let transform = ''
	if (originalStyle && originalStyle.transform) transform += originalStyle.transform + ' '
	let translate = Math.round(distance * (1 - progress))
	switch (side) {
	case 'top': transform += `translateY(${translate}${unit})`; break
	case 'bottom': transform += `translateY(${-translate}${unit})`; break
	case 'left': transform += `translateX(${translate}${unit})`; break
	case 'right': transform += `translateX(${-translate}${unit})`; break
	}
	return {...originalStyle, transform}
}

export function scale({
	originalStyle,
	origin,
	axis = 'scale',
	initialScale = 0.5,
	progress
}) {
	let transform = ''
	if (originalStyle && originalStyle.transform) transform += originalStyle.transform + ' '
	let scale = initialScale + progress * (1 - initialScale)
	transform += `${axis}(${scale})`
	let style = {...originalStyle, transform}
	if (origin) style.transformOrigin = origin
	return style
}

export function fadeAndSlide({originalStyle, side, distance, progress}) {
	return slide({
		originalStyle: fade({originalStyle, progress}),
		side, distance, progress
	})
}

export function fadeAndScale({originalStyle, origin, axis, initialScale, progress}) {
	return scale({
		originalStyle: fade({originalStyle, progress}),
		origin, initialScale, progress, axis
	})
}
