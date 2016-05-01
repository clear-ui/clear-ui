import SIZES from '../styles/sizes'

// sizes in rems
const LINE_HEIGHT = 1.5
const ICON_SIZE = 1.5
const ICON_MARGIN = 0.5 // margin between icon and text
const PADDINGS = {
	default: 1,
	big: 2
}

/**
 * Makes common styles for elements with text and icons.
 *
 * @param {'default'|'big'|'small'} props.height Height of the element.
 * @param {'default'|'big'} props.padding Horizontal paddings size.
 * @param {React.Element|boolean} [props.leftIcon] Icon on the left side.
 * @param {React.Element|boolean} [props.rightIcon] Icon on the right side.
 * @param {boolean} [props.indent] Indent text as in the element with left icon.
 * @param {boolean} [props.multiline] If `true`, label can have multiple lines.
 * @param {number} [nestingLevel=0] Indent content of the element when it is
 *     nested inside other elements.
 *
 * @returns {object} Styles for root, label, leftIcon and rightIcon elements.
 */
export default function getIconElementStyle(props) {
	let height = SIZES[props.height].height
	let padding = PADDINGS[props.padding]

	const nestingIndentSize = (props.padding === 'big') ? 1.5 : 1
	const nestingIndent = 'nestingLevel' in props ? (props.nestingLevel * nestingIndentSize) : 0

	let labelVertPadding = (height - LINE_HEIGHT) / 2
	let labelLeftPadding = (props.leftIcon || props.indent) ?
		(padding + ICON_SIZE + ICON_MARGIN) :
		padding
	labelLeftPadding += nestingIndent
	let labelRightPadding = props.rightIcon ?
		(padding + ICON_SIZE + ICON_MARGIN) :
		padding

	let iconVertPos = (height - ICON_SIZE) / 2
	let iconHorizPos = padding

	let root = {
		position: 'relative'
	}

	let label = {
		lineHeight: LINE_HEIGHT + 'rem',
		fontSize: SIZES[props.height].fontSize + 'rem',
		overflowX: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: props.multiline ? 'normal' : 'nowrap',
		paddingTop: labelVertPadding + 'rem',
		paddingBottom: labelVertPadding + 'rem',
		paddingLeft: labelLeftPadding + 'rem',
		paddingRight: labelRightPadding + 'rem'
	}

	let leftIcon, rightIcon
	if (props.rightIcon || props.leftIcon) {
		let icon = {
			width: ICON_SIZE + 'rem',
			verticalAlign: 'top',
			position: 'absolute',
			top: iconVertPos + 'rem',
			lineHeight: '1rem',
			transition: 'all 0.15s', // TODO
			width: ICON_SIZE + 'rem',
			height: ICON_SIZE + 'rem'
		}

		if (props.leftIcon) leftIcon = {...icon, left: iconHorizPos + 'rem'}
		if (props.rightIcon) rightIcon = {...icon, right: iconHorizPos + 'rem'}
	}

	return {root, label, leftIcon, rightIcon}
}
