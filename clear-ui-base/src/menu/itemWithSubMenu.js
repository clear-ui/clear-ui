import React from 'react'

import Attachment from '../attachment'
import mixin from '../utils/mixin/decorator'
import BoundFunction, {funcOrBoundFuncType} from '../utils/boundFunction'
// import StylesMixin from '../utils/stylesMixin'
// import ManagedStateMixin from '../utils/managedStateMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'

// TODO
// StylesMixin / menuItem as childComponent
// shouldComponentUpdate (bound function)

/**
 * Wrapper component for MenuItem that allows it to contain a sub menu.
 * Sub menu can be shown under the item or in the separate layer attached to the side of the item.
 * MenuItem with sub menu has opener icon on the right.
 */
@mixin(ChildComponentsMixin)
class MenuItemWithSubMenu extends React.Component {
	static displayName = 'MenuItemWithSubMenu'

	static propTypes = {
		...MenuItem.propTypes,
		
		/**
		 * `Menu` element that will be contained inside the item.
		 */
		subMenu: React.PropTypes.element,

		/** Class of menu item component. */
		menuItemComponent: React.PropTypes.func,

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
		subMenuHoverShowDelay: 100
	}

	static childComponents = {
		/** Right icon for items with nested items. */
		openerIcon: null,
	}

	render() {
		let {
			subMenu,
			menuItemComponent,
			renderSubMenuInLayer,
			subMenuTrigger,
			subMenuHoverShowDelay,
			onHoverSubMenuItem,
			onSelectSubMenuItem,
			...props
		}

		let itemProps = {...props}
		if (subMenu) {
			itemProps.rightIcon = this.getChildComponent('openerIcon')
			if (subMenuShowTrigger === 'openerTap') {
				itemProps.onRightIconTap = this.toggleSubMenu.bind(this)
			}
		}
		let item = React.createElement(menuItemComponent, itemProps)

		if (subMenu && this.state.showNestedItems) {
			let subMenu = this.renderSubMenu()

			if (renderSubMenuInLayer) {
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
		return <div key='subMenu' style={this.styles.subMenu}>{menu}</div>
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
}
