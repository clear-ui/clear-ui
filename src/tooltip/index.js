import React from 'react'
import {Motion, spring} from 'react-motion'

import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import Attachment from '../attachment'
import Tappable from '../tappable'
import Animation, {fadeAndSlide, fadeAndScale, fade} from '../animations'

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

// Creates attachment point for the tooltip
function createAttachmentPoint(side, align, offset) {
	/*
	1. point on main axis is defined by side
		point on the element - side
		point on the tooltip - opposite of the side
	2. point on second axis is defined by position of arrow
		begin / center / end of the axis on both element's and target's points
	*/
	let mainAxis = (side === 'top' || side === 'bottom') ? 'vert' : 'horiz'
	let secondAxis = (mainAxis === 'vert') ? 'horiz' : 'vert'

	let mainAxisPoint = side
	let mainAxisOppositePoint = OPPOSITE_SIDES[side]
	let secondAxisPoint = POSITION_POINTS[align][secondAxis]

	let attachment
	if (mainAxis === 'vert') {
		let signedOffset = (side === 'bottom') ? offset : -offset
		attachment = {
			element: `${secondAxisPoint} ${mainAxisOppositePoint}`,
			target: `${secondAxisPoint} ${mainAxisPoint}`,
			offset: `0 ${signedOffset}`
		}
	} else {
		let signedOffset = (side === 'right') ? offset : -offset
		attachment = {
			element: `${mainAxisOppositePoint} ${secondAxisPoint}`,
			target: `${mainAxisPoint} ${secondAxisPoint}`,
			offset: `${signedOffset} 0`
		}
	}
	return attachment
}

/*
 * @param [props.closeButton=false] {Boolean} Показывать кнопку закрытия, ms.
 * @param [props.hideOnOutsideClick=false] {Boolean} Закрывать по клику.
 * @param [props.hideDelay=500] {Number} Задержка перед скрытием, ms.
 * @param [props.hideOnMouseOut=true] {Boolean} Скрывать, если убрать курсор с элемента.
 * @param [props.hideAnimationTime=0] {Number} Длительность анимации скрывания, ms.
 * @param [props.arrow]
 */
@mixinDecorator(StylesMixin, ManagedStateMixin, ChildComponentsMixin)
class Tooltip extends React.Component {
	static propTypes = {
		children: React.PropTypes.element.isRequired,
		tooltip: React.PropTypes.node.isRequired,
		showOnHover: React.PropTypes.bool,
		showOnClick: React.PropTypes.bool,
		sides: React.PropTypes.arrayOf(
			React.PropTypes.oneOf(['top', 'bottom', 'right', 'left'])
		),
		align: React.PropTypes.oneOf(['begin', 'center', 'end']),
		offset: React.PropTypes.number
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

	//componentWillReceiveProps(props) {
		//let side = props.sides[0]
		//this.updateSide(side)
	//}

	updateSide(side) {
		if (this.state.side !== side) this.setState({side})
	}

	getOffset() {
		return this.props.offset
	}

	render() {
		let target = this.props.children

		if (this.props.showOnHover || this.props.showOnClick) {
			if (typeof target.type !== 'string') {
				throw new Error(`When Tooltip has 'showOnHover: true' or ` +
					`'showOnClick: true' its children must be single DOM-component.`)
			}

			let props = {}
			//if (this.props.showOnClick) {
				//props.onTap = () => { this.setManagedState({open: !this.state.open}) }
			//} else
			if (this.props.showOnHover) {
				props.onChangeTapState = ({hovered}) => {
					clearTimeout(this.timer)
					if (hovered) {
						if (!this.state.open) {
							this.timer = setTimeout(() => {
								this.setManagedState({open: true})
							}, this.props.openTimeout)
						}
					} else {
						if (this.state.open) {
							this.timer = setTimeout(() => {
								this.setManagedState({open: false})
							}, this.props.closeTimeout)
						}
					}
				}
			}
			target = React.createElement(Tappable, props, target)
		}

		let attachment = React.createElement(Attachment, {
			open: this.state.open,
			onClose: () => { this.setManagedState({open: false}) },
			onChangeAttachment: (id) => {
				this.updateSide(this.props.sides[id])
			},
			attachment: this.props.sides.map((side) => {
				return createAttachmentPoint(side, this.props.align, this.getOffset())
			}),
			//layerProps: {
				//closeOnEsc: true when open with click but not hover
			//},
		}, target)

		let tooltip = this.renderTooltip()

		if (this.props.animation) {
			return React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(this.state.open ? 1 : 0, {stiffness: 320, damping: 30})}
			}, (value) => {
				let tooltipAnimation = React.cloneElement(
					this.getChildComponent('animation'),
					{progress: value.progress},
					tooltip
				)
				return React.cloneElement(attachment, {
					open: this.state.open || value.progress !== 0,
					element: tooltipAnimation
				})
			})
		} else {
			return React.cloneElement(attachment, {
				element: tooltip
			})
		}
	}

	renderTooltip() {
		return React.DOM.div({style: this.styles.root}, [
			this.props.tooltip, this.props.arrow && this.renderArrow()
		])
	}

	renderArrow() {
		return React.DOM.div({style: this.styles.arrow})
	}
}

export default Tooltip
