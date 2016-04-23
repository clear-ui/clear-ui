import $ from 'jquery'

let scrollbarWidth

export default function() {
	if (scrollbarWidth) return scrollbarWidth

	let scrollDiv = $('<div>', {
		css: {
			width: 100,
			height: 100,
			overflow: 'scroll',
			position: 'absolute',
			top: -9999
		}
	})[0]
	document.body.appendChild(scrollDiv)
	scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	document.body.removeChild(scrollDiv)

	return scrollbarWidth
}
