import React from 'react'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import RippleButton from './rippleButton'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themes/themeMixin'
import TRANSITIONS from 'clear-ui-base/lib/utils/transitions'

// Button with basic material styles.
@mixinDecorator(ThemeMixin)
export default class MaterialButton extends RippleButton {
	static propTypes = {
		...RippleButton.propTypes,

		/** Smaller size of the button. */
		dense: React.PropTypes.bool,

		/** Background color of the button (CSS color property). */
		color: React.PropTypes.string,

		/** Use primary color from the current theme as background. */
		primary: React.PropTypes.bool,

		/** Use accent color from the current theme as background. */
		accent: React.PropTypes.bool
	}

	static contextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	static styles = composeStyles(
		RippleButton.styles,
		(props) => {
			let root = {
				verticalAlign: 'middle',
				display: 'inline-block',
				fontSize: 14,
				fontWeight: 500,
				borderRadius: 2,
				paddingRight: 16,
				paddingLeft: 16,
				minWidth: 64,
				height: 36,
				lineHeight: '36px',
				textAlign: 'center',
				textTransform: 'uppercase',
				cursor: props.disabled ? 'default' : 'pointer',
				outline: 'none',
				transition:
					`box-shadow .25s ease-in,` +
					`background-color .4s ${TRANSITIONS.strongEaseOut},` +
					`color .4s ${TRANSITIONS.strongEaseOut}`,
				userSelect: 'none',
				WebkitTapHighlightColor: 'rgba(0,0,0,0)' // mobile
			}

			if (props.dense) {
				Object.assign(root, {
					height: 32,
					lineHeight: '32px',
					fontSize: 13
				})
			}

			return {root}
		}
	)

	render() { return super.render() } // for react-docgen
}
