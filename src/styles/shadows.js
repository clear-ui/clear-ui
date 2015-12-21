let umbraOpacity = 0.2
let penumbraOpacity = 0.14
let ambientShadowOpacity = 0.12

let umbraColor = `rgba(0,0,0,${umbraOpacity})`
let penumbraColor = `rgba(0,0,0,${penumbraOpacity})`
let ambientShadowColor = `rgba(0,0,0,${ambientShadowOpacity})`

export default {
	2:  `0 2px 2px 0 ${umbraColor},` +
		`0 3px 1px -2px ${penumbraColor},` +
		`0 1px 5px 0 ${ambientShadowColor}`,

	3:  `0 3px 4px 0 ${umbraColor},` +
 		`0 3px 3px -2px ${penumbraColor},` +
        `0 1px 8px 0 ${ambientShadowColor}`,

  	4:  `0 4px 5px 0 ${umbraColor},` +
		`0 2px 4px -1px ${penumbraColor},` +
		`0 1px 10px 0 ${ambientShadowColor}`,

	6:  `0 6px 10px 0 ${umbraColor},` +
		`0 3px 5px -1px ${penumbraColor},` +
		`0 1px 18px 0 ${ambientShadowColor}`,

	8:  `0 8px 10px 1px ${umbraColor},` +
		`0 5px 5px -3px ${penumbraColor},` +
		`0 3px 14px 2px ${ambientShadowColor}`,

	16: `0 16px 24px 2px ${umbraColor},` +
		`0  6px 30px 5px ${ambientShadowColor},` +
		`0  8px 10px -5px ${penumbraColor}`,
	
	24: `0  9px 46px  8px ${umbraColor},` +
		`0 11px 15px -7px ${ambientShadowColor},` +
		`0 24px 38px  3px ${penumbraColor}`
}
