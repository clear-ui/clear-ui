import Color from 'color'

const black = Color('black')

export default {
	black1: black.clone().value(25).rgbaString(),
	black2: black.clone().value(50).rgbaString(),
	black3: black.clone().value(70).rgbaString(),
	black4: black.clone().value(87).rgbaString(),
	black5: black.clone().value(95).rgbaString(),

	blue: Color({h: 217, s: 75, v: 90}).rgbaString(),
	green: Color({h: 118, s: 75, v: 65}).rgbaString(),
	red: Color({h: 358, s: 85, v: 85}).rgbaString()
}

