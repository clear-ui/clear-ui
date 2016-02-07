import color from 'color'

import COLORS from './colors'

export default {
	primary: COLORS.blue700,
	accent: COLORS.pinkA200,

	text: COLORS.white,
	secondary: COLORS.mediumWhite, // deprecated
	secondaryText: COLORS.mediumWhite,

	disabled: COLORS.lightWhite,
	background: '#333',
	dividers: 'red', // TODO

	hovered: color('#ccc').alpha(0.15).rgbaString(), // deprecated
	pressed: color('#ccc').alpha(0.25).rgbaString(), // deprecated

	hoveredBackground: color('#ccc').alpha(0.15).rgbaString(),
	presseBackgroundd: color('#ccc').alpha(0.25).rgbaString()
}
