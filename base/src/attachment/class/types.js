// @flow
export type AttachmentMirrorAxis = 'all' | 'vert' | 'horiz' | 'none'

/**
 * Description of how the attached element should be positioned relatively
 * to the target element. It has two points, one on the attached element and
 * second on the target element, that will be connected together, and an offset.
 */
export type AttachmentConfig = {
	/**
	 * Attachment point of the element.
	 * String of the form of 'vert-attachment horiz-attachment'.
	 * Attachment value is a number with 'px' or '%'.
	 * Also, 'vert-attachment' can be: 'top', 'middle' and 'bottom',
	 * and 'horiz-attachment' can be 'left', 'right' and 'center'.
	 */
	element: string;

	/** Attachment point of the target element. Format is same as for 'element'. */
	target: string;

	/**
	 * Offset of the element. Format is same as for 'element' and 'target',
	 * but without special values.
	 */
	offset?: string;
}


// ParsedAttachmentConfig types

export type HorizSpecialValue = 'left' | 'center' | 'right'
export type VertSpecialValue = 'top' | 'middle' | 'bottom'
export type SpecialValue = VertSpecialValue | HorizSpecialValue

export type SpecialValuesMap<T: SpecialValue> = {
	[key: T]: PointValue
}

export type Unit = 'px' | '%'

export type PointValue = {
	value: number;
	unit: Unit;
}

export type Point = {
	horiz: PointValue;
	vert: PointValue;
}

export type ParsedAttachmentConfig = {
	target: Point;
	element: Point;
	offset?: Point;
}


// Measurements types

export type ElementMeasurements = {
	offset: {left: number, top: number};
	width: number;
	height: number;
}

export type ViewportMeasurements = {
	scrollTop: number;
	scrollLeft: number;
	height: number;
	width: number;
}

export type ViewportBounds = {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export type Measurements = {
	element: ElementMeasurements;
	target: ElementMeasurements;
	viewport: ViewportMeasurements;
	bounds: ViewportBounds;
}


export type CssPosition = {
	left: number,
	top: number
}
