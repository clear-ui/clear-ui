import $ from 'jquery'

let $window = $(window)

function readElemMeasurements(elem) {
	return {
		offset: elem.offset(),
		width: elem.outerWidth(),
		height: elem.outerHeight()
	}
}

function readViewportMeasurements() {
	return {
		scrollTop: $window.scrollTop(),
		scrollLeft: $window.scrollLeft(),
		height: $window.height(),
		width: $window.width()
	}
}

function getViewportBounds(viewport) {
	return {
		left: viewport.scrollLeft,
		right: viewport.scrollLeft + viewport.width,
		top: viewport.scrollTop,
		bottom: viewport.scrollTop + viewport.height
	}
}

export default function readMeasurements(element, target) {
	let viewport = readViewportMeasurements()
	let bounds = getViewportBounds(viewport)
	let measurements = {
		element: readElemMeasurements(element),
		target: readElemMeasurements(target),
		viewport,
		bounds
	}
	return measurements
}
