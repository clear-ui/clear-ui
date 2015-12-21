import React from 'react'

function getFadeStyle({originalStyle, progress}) {
	let opacity = (originalStyle && originalStyle.opacity) || 1
	opacity *= progress
	return {opacity}
}

// changes opacity
export class FadeAnimation extends React.Component {
	render() {
		let elem = this.props.children
		return React.cloneElement(elem, {
			style: {
				...elem.props.style,
				...getFadeStyle({
					originalStyle: elem.props.style,
					progress: this.props.progress
				})
			}
		})
	}
}

function getSlideStyle({side = 'top', distance = 10, progress}) {
	let style = {}
	let translate = distance * (1 - progress)
	switch (side) {
		case 'top': style.marginTop = translate + 'px'; break
		case 'bottom': style.marginTop = -translate + 'px'; break
		case 'left': style.marginLeft = translate + 'px'; break
		case 'right': style.marginLeft = -translate + 'px'; break
	}
	return style
}

// changes margins
export class SlideAnimation extends React.Component {
	//static defaultProps = {
		//side: 'top',
		//distance: 10
	//}

	render() {
		let elem = this.props.children
		let {side, distance, progress} = this.props
		return React.cloneElement(elem, {
			style: {
				...elem.props.style,
				...getSlideStyle({side, distance, progress})
			}
		})
	}
}

export class FadeSlideAnimation extends React.Component {
	//defaultProps
	render() {
		let elem = this.props.children
		let {side, distance, progress} = this.props
		return React.cloneElement(elem, {
			style: {
				...elem.props.style,
				...getSlideStyle({side, distance, progress}) ,
				...getFadeStyle({originalStyle: elem.props.style, progress})
			}
		})
	}
}

// changes transform and transform-origin
export class ScaleAnimation extends React.Component {
	render() {
		let {progress, origin} = props

		let elem = this.props.children
		let transform = ''
		if (elem.style && elem.style.transform) transform += elem.style.transform + ' '
		transform += `scale(${progress})`

		let style = {
			...elem.style,
			transform,
			transformOrigin: origin
		}
		return React.cloneElement(this.props.children, {style})
	}
}
