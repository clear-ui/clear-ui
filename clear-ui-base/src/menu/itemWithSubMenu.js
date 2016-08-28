import React from 'react'

import Attachment from '../attachment'
import mixin from '../utils/mixin/decorator'
import BoundFunction, {funcOrBoundFuncType, shouldComponentUpdate} from '../utils/boundFunction'
import Tappable from '../tappable'
import StylesMixin from '../utils/stylesMixin'
import ManagedStateMixin from '../utils/managedStateMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'

import MenuItem from './item'

// TODO
// StylesMixin / menuItem as childComponent

/**
 * Wrapper component for MenuItem that can to contain a sub menu.
 * Sub menu can be shown under the item or in the separate layer
 * attached to the side of the item.
 * MenuItem with sub menu shows opener icon on the right.
 *
 * Styleable elements:
 * - subMenu
 */
@mixin(ChildComponentsMixin, StylesMixin, ManagedStateMixin)
export default class MenuItemWithSubMenu extends React.Component {
	static displayName = 'MenuItemWithSubMenu'

	static propTypes = {
		...MenuItem.propTypes,
		
		/**
		 * `Menu` element that will be contained inside the item.
		 */
		subMenu: React.PropTypes.element,

		/** Class of menu item component. */
		itemComponent: React.PropTypes.func,

		/**
		 * When `true`, sub menu is rendered in the layer attached to the side of the item,
		 * else it is rendered under the containing item and its items will have
		 * nesting level increased by 1.
		 */
		renderSubMenuInLayer: React.PropTypes.bool,

		/**
		 * Method of opening and closing the sub menu:
		 * - `tap` - Tapping the item or pressing `Enter` key while the item is hovered.
		 * - `openerTap` - Tapping the opener icon.
		 * - `hover` - Hovering the item.
		 */
		subMenuTrigger: React.PropTypes.oneOf(['tap', 'openerTap', 'hover']),

		/**
		 * Delay before opening sub menu when `subMenuTrigger` is `hover`, in ms.
		 */
		subMenuHoverShowDelay: React.PropTypes.number,

		/**
		 * (item) => void
		 *
		 */
		onHoverSubMenuItem: funcOrBoundFuncType,

		/**
		 * (item) => void
		 *
		 */
		onSelectSubMenuItem: funcOrBoundFuncType
	}

	static defaultProps = {
		subMenuTrigger: 'tap',
		subMenuHoverShowDelay: 200
	}

	static childComponents = {
		/** Right icon for items with sub menus. */
		openerIcon: null
	}
	
	constructor(props) {
		super(props)
		this.state = {
			showSubMenu: false,
			tapState: {hovered: false, pressed: false},
			subMenuTapState: {hovered: false, pressed: false}
		}
		this.initManagedState(['tapState'])
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return shouldComponentUpdate(
			this.props, this.state,
			nextProps, nextState,
			[
				'onTap', 'onChangeTapState',
				'onHoverSubMenuItem', 'onSelectSubMenuItem'
			]
		)
	}

	componentDidUpdate() {
		if (this.props.subMenuTrigger === 'hover') {
			this.onChangeHovered(
				this.state.tapState.hovered || this.state.subMenuTapState.hovered
			)
		}
	}

	render() {
		let item = this.renderItem()

		if (this.props.subMenu && this.state.showSubMenu) {
			let subMenu = this.renderSubMenu()

			if (this.props.renderSubMenuInLayer) {
				return React.createElement(Attachment, {
					...this.getSubMenuAttachment(),
					open: true,
					element: subMenu,
					children: item
				})
			} else {
				return <div>{item}{subMenu}</div>
			}
		} else {
			return item
		}
	}

	renderItem() {
		let {
			subMenu,
			itemComponent,
			renderSubMenuInLayer,
			subMenuTrigger,
			subMenuHoverShowDelay,
			onHoverSubMenuItem,
			onSelectSubMenuItem,
			...props
		} = this.props

		let itemProps = {...props}

		if (subMenu) {
			itemProps.rightIcon = this.getChildComponent('openerIcon')
			if (subMenuTrigger === 'openerTap') {
				itemProps.onRightIconTap = this.toggleSubMenu.bind(this)
			} else if (subMenuTrigger === 'tap') {
				itemProps.onTap = this.toggleSubMenu.bind(this)
			} else if (subMenuTrigger === 'hover') {
				itemProps.onChangeTapState = (tapState) => this.setManagedState({tapState})
				itemProps.tapState = this.state.tapState
			}
		}

		return React.createElement(itemComponent, itemProps)
	}

	renderSubMenu() {
		let menu = React.cloneElement(this.props.subMenu, {
			ref: (ref) => { this.subMenuRef = ref },
			onHoverItem: (item) => {
				BoundFunction.call(this.props.onHoverSubMenuItem, item)
			},
			onSelect: (item) => {
				BoundFunction.call(this.props.onSelectSubMenuItem, item)
			},
			nestingLevel: this.props.renderSubMenuInLayer ? 0 : (this.props.nestingLevel + 1)
		})

		let subMenu = <div key='subMenu' style={this.styles.subMenu}>{menu}</div>

		if (this.props.subMenuTrigger === 'hover') {
			subMenu = React.createElement(Tappable, {
				onChangeTapState: (tapState) => this.setState({subMenuTapState: tapState})
			}, subMenu)
		}

		return subMenu
	}

	moveSubMenuHover(direction, moveOverEdges) {
		return this.subMenuRef.moveHover(direction, moveOverEdges)
	}

	getSubMenuAttachment() {
		return {
			display: 'block',
			mirrorAttachment: 'horiz',
			attachment: {
				target: 'right top',
				element: 'left top'
			},
			viewportPadding: 10,
			constrain: true
		}
	}

	toggleSubMenu() {
		this.setState({showSubMenu: !this.state.showSubMenu})
	}

	onChangeHovered(hovered, canOnlyClose) {
		clearTimeout(this.openCloseTimeout)
		if (hovered) {
			if (!this.state.showSubMenu && !canOnlyClose) {
				this.openCloseTimeout = setTimeout(
					() => this.setState({showSubMenu: true}),
					this.props.subMenuHoverShowDelay
				)
			}
		} else {
			if (this.state.showSubMenu) {
				// Timeout is required here because componentDidUpdate
				// leads to pending ZContextLayer onRender,
				// and layer can't be hidden until it runs.
				// FIXME remove onrender callback in layer's unmount?
				this.openCloseTimeout = setTimeout(
					() => this.setState({showSubMenu: false}),
					0
				)
			}
		}
	}
}
