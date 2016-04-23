import React from 'react'

import BaseTreeMenu, {
	TreeMenuItem as BaseTreeMenuItem,
	TreeMenuHeader as BaseTreeMenuHeader,
	TreeMenuSubMenu as BaseTreeMenuSubMenu,
	TreeMenuGroup
} from 'clear-ui-base/lib/treeMenu'
import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'
import transferProps from 'clear-ui-base/lib/utils/transferProps'
import isSameOrInheritedType from 'clear-ui-base/lib/utils/isSameOrInheritedType'
import Icon from 'clear-ui-base/lib/icon'
import {MenuItem} from '../menu'

const TRANSFERED_PROPS = ['indent', 'height', 'padding', 'multiline']

function getIndentStyle(props) {
	let indentSize = (props.padding === 'big') ? 1.5 : 1
	return {paddingLeft: (props.level * indentSize) + 'rem'}
}

class TreeMenuItem extends BaseTreeMenuItem {
	static styles = (props) => {
		return {indent: getIndentStyle(props)}
	}

	static childComponents = {
		openerIcon: (props) => {
			let icon = (!props.autoOpen && props.open) ?
				Icon.ICONS.triangleUp :
				Icon.ICONS.triangleDown
			return React.createElement(Icon, {icon})
		},
		menuItem: (props) => {
			let {height, multiline, padding, indent} = props
			return React.createElement(MenuItem, {height, multiline, padding, indent})
		}
	}
}

class TreeMenuHeader extends BaseTreeMenuHeader {
	static styles = (props) => {
		return {indent: getIndentStyle(props)}
	}

	static childComponents = composeChildComponents(
		TreeMenuItem.childComponents,
		{
			menuItem: (props, state, defaultMenuItem) => {
				return React.cloneElement(defaultMenuItem, {
					style: {
						fontWeight: 500,
						textTransform: 'uppercase'
					}
				})
			}
		}
	)
}

class TreeMenuSubMenu extends BaseTreeMenuSubMenu {
	static styles = {
		root: {
			paddingBottom: '0.35rem'
		}
	}
}

class TreeMenu extends BaseTreeMenu {
	processChildren(children, level) {
		let childrenWithProps = React.Children.map(children, (elem) => {
			if (isSameOrInheritedType(elem.type, TreeMenuItem) ||
				isSameOrInheritedType(elem.type, TreeMenuHeader)
			) {
				return transferProps(this, elem, TRANSFERED_PROPS)
			} else {
				return elem
			}
		})
		return super.processChildren(childrenWithProps, level)
	}
}

export default TreeMenu
export {TreeMenuItem, TreeMenuHeader, TreeMenuGroup, TreeMenuSubMenu}
