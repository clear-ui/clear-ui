import color from 'color'

import COLORS from '../styles/colors'

export default {
	primary: COLORS.blue700,
	accent: COLORS.pinkA200,

	text: COLORS.darkBlack,
	secondary: COLORS.mediumBlack, // TODO deprecated
	secondaryText: COLORS.mediumBlack,

	disabled: COLORS.lightBlack,
	dividers: COLORS.faintBlack,
	background: COLORS.white,

	hovered: color('#999').alpha(0.2).rgbaString(), // TODO deprecated
	pressed: color('#999').alpha(0.4).rgbaString(), // TODO deprecated

	hoveredBackground: color('#999').alpha(0.2).rgbaString(),
	pressedBackground: color('#999').alpha(0.4).rgbaString()
}
