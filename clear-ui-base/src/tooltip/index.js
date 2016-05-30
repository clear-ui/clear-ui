import React from 'react'
import {Motion, spring} from 'react-motion'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import Attachment from '../attachment'
import Tappable from '../tappable'
import FocusableTappable from '../tappable/focusableTappable.js'
import Animation from '../animation'
import {fadeAndSlide, fadeAndScale, fade} from '../animation/functions'
import {fastAndHardSpring} from '../animation/springPresets'

const OPPOSITE_SIDES = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left'
}

const POSITION_POINTS = {
	begin: {horiz: 'left', vert: 'top'},
	center: {horiz: 'center', vert: 'middle'},
	end: {horiz: 'right', vert: 'bottom'}
}

function createAttachmentConfig(side, align, offset) {
	/**
	 * 1. point on main axis is defined by side
	 *     point on the element - side
	 *     point on the tooltip - opposite of the side
	 * 2. point on second axis is defined by position of the arrow
	 *     begin/center/end of the axis on both element's and target's points
	 */
	let mainAxis = (side === 'top' || side === 'bottom') ? 'vert' : 'horiz'
	let secondAxis = (mainAxis === 'vert') ? 'horiz' : 'vert'

	let mainAxisPoint = side
	let mainAxisOppositePoint = OPPOSITE_SIDES[side]
	let secondAxisPoint = POSITION_POINTS[align][secondAxis]

	if (mainAxis === 'vert') {
		let signedOffset = (side === 'bottom') ? offset : -offset
		return {
			element: `${secondAxisPoint} ${mainAxisOppositePoint}`,
			target: `${secondAxisPoint} ${mainAxisPoint}`,
			offset: `0 ${signedOffset}`
		}
	} else {
		let signedOffset = (side === 'right') ? offset : -offset
		return {
			element: `${mainAxisOppositePoint} ${secondAxisPoint}`,
			target: `${mainAxisPoint} ${secondAxisPoint}`,
			offset: `${signedOffset} 0`
		}
	}
}

@mixin(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
export default class Tooltip extends React.Component {
	static displayName = 'Tooltip'

	static propTypes = {
		/** Element to which the tooltip is attached. */
		children: React.PropTypes.element.isRequired,

		/** Content of the tooltip. */
		tooltip: React.PropTypes.node.isRequired,

		/**
		 * When `true`, tooltip shows on tapping the element.
		 * This options is not compatible with other show options.
		 */
		showOnClick: React.PropTypes.bool,

		/**
		 * When `true`, tooltip shows on hovering the element.
		 * This option can be used with `showOnFocus` at the same time.
		 * */
		showOnHover: React.PropTypes.bool,

		/**
		 * When `true`, tooltip shows on focusing the element.
		 * This option can be used with `showOnHover` at the same time.
		 */
		showOnFocus: React.PropTypes.bool,

		/**
		 * Additional props that you may need to set on the inner Tappable component,
		 * like `preventFocusOnTap` or `wrapperDisplay`.
		 */
		tappableProps: React.PropTypes.object,

		/** List of sides where tooltip can be shown in the order of priority. */
		sides: React.PropTypes.arrayOf(
			React.PropTypes.oneOf(['top', 'bottom', 'right', 'left'])
		),

		/** Alignment of the tooltip relative to the element's side. */
		align: React.PropTypes.oneOf(['begin', 'center', 'end']),

		/** TODO */
		arrow: React.PropTypes.bool,

		/** Distance between the tooltip and the element, in px. */
		offset: React.PropTypes.number,

		/** Style of the showing and hiding animations of the tooltip. */
		animation: React.PropTypes.oneOf(['slide', 'scale', 'fade', false]),

		/** Time before the tooltip starts opening after hovering the element, in ms. */
		openTimeout: React.PropTypes.number,

		/** Time before the tooltip starts closing after the element loses hover, in ms. */
		closeTimeout: React.PropTypes.number,
	}

	static defaultProps = {
		sides: ['top', 'right', 'bottom', 'left'],
		showOnHover: true,
		showOnClick: false,
		align: 'center',
		offset: 10,
		animation: false,
		openTimeout: 250,
		closeTimeout: 0
	}

	static childComponents = {
		animation: (props, state) => {
			if (props.animation === 'slide') {
				return React.createElement(Animation, {
					fn: fadeAndSlide,
					params: {side: state.side}
				})
			}

			if (props.animation === 'scale') {
				return React.createElement(Animation, {
					fn: fadeAndScale,
					params: {origin: `${OPPOSITE_SIDES[state.side]} center`}
				})
			}

			if (props.animation === 'fade') {
				return React.createElement(Animation, {fn: fade})
			}
		}
	}

	constructor(props) {
		super(props)
		// TODO this.initManagedState(['open'])
		if (!this.state) this.state = {}
		this.state.rest = true
	}

	render() {
		let target = this.renderTarget()

		let attachment = React.createElement(Attachment, {
			open: this.state.open,
			onClose: () => { this.setManagedState({open: false}) },
			attachment: this.props.sides.map((side) => {
				return createAttachmentConfig(side, this.props.align, this.getOffset())
			}),
			onChangeAttachment: (id) => {
				this.updateSide(this.props.sides[id])
			}
			//layerProps: {
				//closeOnEsc: TODO true when open with click but not hover
			//},
		}, target)

		if (this.props.animation) {
			let motion = React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(this.state.open ? 1 : 0, fastAndHardSpring)},
				onRest: () => { this.setState({rest: true}) }
			}, (value) => {
				return React.cloneElement(
					this.getChildComponent('animation'),
					{progress: value.progress},
					this.renderTooltip()
				)
			})

			return React.cloneElement(attachment, {
				open: this.state.open || !this.state.rest,
				element: motion
			})
		} else {
			return React.cloneElement(attachment, {
				element: this.renderTooltip()
			})
		}
	}

	renderTarget() {
		let tappableType = this.props.showOnFocus ? FocusableTappable : Tappable
		let tappable = React.createElement(tappableType, null, this.props.children)

		let props = {
			...this.props.tappableProps
		}
		if (this.props.showOnTap) {
			props.onTap = () => { this.setManagedState({open: !this.state.open}) }
		} else {
			if (this.props.showOnHover) {
				props.onChangeTapState = ({hovered}) => {
					this.isHovered = hovered
					if (this.props.showOnFocus && this.isFocused) return
					this.onChangeHovered(hovered)
				}
			}
			if (this.props.showOnFocus) {
				props.onFocus = () => {
					this.isFocused = true
					this.setManagedState({open: true})
				}
				props.onBlur = () => {
					this.isFocused = false
					if (this.props.showOnHover && this.isHovered) return
					this.setManagedState({open: false})
				}
			}
		}

		return React.cloneElement(tappable, props)
	}

	renderTooltip() {
		let tooltip = (
			<div>
				{this.props.tooltip}
				{this.props.arrow && this.renderArrow()}
			</div>
		)
		if (!this.props.showOnTap && this.props.showOnHover) {
			tooltip = (
				<Tappable
					onChangeTapState={({hovered}) => {
						if (this.props.showOnFocus && this.isFocused) return
						this.onChangeHovered(hovered, true)
					}}
				>
					{tooltip}
				</Tappable>
			)
		}
		// set styles on top element to allow Animation to access styles
		return React.cloneElement(tooltip, {style: this.styles.root})
	}

	renderArrow() {
		return <div style={this.styles.arrow}/>
	}

	updateSide(side) {
		if (this.state.side !== side) this.setState({side})
	}

	getOffset() {
		return this.props.offset
	}

	onChangeHovered(hovered, canOnlyClose) {
		clearTimeout(this.timer)
		if (hovered) {
			if (!canOnlyClose && !this.state.open) {
				this.timer = setTimeout(() => {
					this.setManagedState({open: true, rest: false})
				}, this.props.openTimeout)
			}
		} else {
			if (this.state.open) {
				this.timer = setTimeout(() => {
					this.setManagedState({open: false, rest: false})
				}, this.props.closeTimeout)
			}
		}
	}
}
