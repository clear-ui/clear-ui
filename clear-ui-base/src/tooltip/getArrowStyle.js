/**
 * Makes styles for positioning arrow of the tooltip.
 * @param {object} options
 * @param {'top'|'bottom'|'left'|'rigth'} options.side - Side of the tooltip.
 * @param {'begin'|'center'|'end'} options.align - Align of the arrow on the tooltip's side.
 * @param {number} options.width - Width of the arrow, for the orientation like this: "/\".
 * @param {number} options.height - Height of the arrow.
 * @param {number} options.margin - Margin between arrow and tooltip's corner.
 * @param {string} options.units - CSS-unit for arrow sizes.
 */
export default function getArrowStyle({side, align, width, height, margin, unit}) {
	let orientation = (side === 'top' || side === 'bottom') ? 'horiz' : 'vert'

	let arrow = {}

	// position on the axis across side with the arrow
	let pos = -height + unit
	if (side === 'top') arrow.bottom = pos
	else if (side === 'bottom') arrow.top = pos
	else if (side === 'left') arrow.right = pos
	else if (side === 'right') arrow.left = pos

	// position on the axis along side with the arrow
	if (orientation === 'horiz') {
		arrow.width = width + unit
		arrow.height = height + unit

		if (align === 'begin') {
			arrow.left = margin + unit
		} else if (align === 'center') {
			arrow.left = '50%'
			arrow.marginLeft = (-width / 2) + unit
		} else if (align === 'end') {
			arrow.left = '100%'
			arrow.marginLeft = (-margin - width) + unit
		}
	} else if (orientation === 'vert') {
		arrow.width = height + unit
		arrow.height = width + unit

		if (align === 'begin') {
			arrow.top = margin + unit
		} else if (align === 'center') {
			arrow.top = '50%'
			arrow.marginTop = (-width / 2) + unit
		} else if (align === 'end') {
			arrow.top = '100%'
			arrow.marginTop = (-margin - width) + unit
		}
	}

	return arrow
}
