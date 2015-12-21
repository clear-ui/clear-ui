import Color from 'color'

import COLORS from './colors'

export default {
	primary: COLORS.blue500,
	accent: COLORS.pinkA200,

	text: COLORS.darkBlack,
	secondary: COLORS.mediumBlack, // deprecated
	secondaryText: COLORS.mediumBlack,

	disabled: COLORS.lightBlack,
	dividers: COLORS.faintBlack,
	background: COLORS.white,

	hovered: Color('#999').alpha(0.2).rgbaString(), // deprecated
	pressed: Color('#999').alpha(0.4).rgbaString(), // deprecated

	hoveredBackground: Color('#999').alpha(0.2).rgbaString(),
	pressedBackground: Color('#999').alpha(0.4).rgbaString()
}
