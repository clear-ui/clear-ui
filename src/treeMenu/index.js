import React from 'react'

import BaseTreeMenu, {
	TreeMenuItem as BaseTreeMenuItem,
	TreeMenuSubMenu as BaseTreeMenuSubMenu,
	TreeMenuGroup
} from 'clear-ui-base/lib/treeMenu'
import transferProps from 'clear-ui-base/lib/utils/transferProps'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'
import Icon from 'clear-ui-base/lib/icon'
import {MenuItem} from '../menu'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

class TreeMenu extends BaseTreeMenu {
	processChildren(children, level) {
		let childrenWithProps = React.Children.map(children, (elem) => {
			if (isSameOrInheritedType(elem.type, TreeMenuItem) //||
				//isSameOrInheritedType(elem.type, TreeMenuLabel)
			) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			} else {
				return elem
			}
		})
		return super.processChildren(childrenWithProps, level)
	}
}

class TreeMenuItem extends BaseTreeMenuItem {
	static styles = (props) => {
		let indentSize = (props.padding === 'big') ? 1.5 : 1
		return {
			indent: {
				paddingLeft: (props.level * indentSize) + 'rem'
			}
		}
	}

	static childComponents = {
		openerIcon: (props) => {
			let icon = (!props.autoOpen && props.open) ?
				Icon.ICONS.triangleUp :
				Icon.ICONS.triangleDown
			return React.createElement(Icon, {icon})
		},
		menuItem: (props) => {
			let itemProps = {}
			if (props.level > 0) itemProps.height = 'small'
			return React.createElement(MenuItem, itemProps)
		}
	}
}

class TreeMenuSubMenu extends BaseTreeMenuSubMenu {
	static styles = {
		root: {
			paddingBottom: '0.35rem'
		}
	}
}

export default TreeMenu
export {TreeMenuItem, TreeMenuGroup, TreeMenuSubMenu}
