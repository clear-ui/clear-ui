import Color from 'color'

import COLORS from './colors'

export default {
	primary: COLORS.blue500,
	accent: COLORS.pinkA200,

	text: COLORS.white,
	secondary: COLORS.mediumWhite, // deprecated
	secondaryText: COLORS.mediumWhite,

	disabled: COLORS.lightWhite,
	background: '#333',
	dividers: 'red', // TODO

	hovered: Color('#ccc').alpha(0.15).rgbaString(), // deprecated
	pressed: Color('#ccc').alpha(0.25).rgbaString(), // deprecated
	hoveredBackground: Color('#ccc').alpha(0.15).rgbaString(),
	presseBackgroundd: Color('#ccc').alpha(0.25).rgbaString(),
}
