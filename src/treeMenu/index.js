import React from 'react'

import isSameOrInheritedType from '../utils/isSameOrInheritedType'
import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'

@mixin(StylesMixin, ChildComponentsMixin)
class TreeMenuItem extends React.Component {
	static childComponents = {
		menuItem: null,
		openerIcon: null
	}

	render() {
		let props = {...this.props}
		if (this.props.opener) {
			props.rightIcon = this.getChildComponent('openerIcon')
			props.onRightIconTap = this.props.onOpenerTap
		}
		let indent = <div style={this.styles.indent}>{this.props.children}</div>
		return React.cloneElement(this.getChildComponent('menuItem'), props, indent)
	}
}

class TreeMenuHeader extends TreeMenuItem {}

@mixin(StylesMixin)
class TreeMenuSubMenu extends React.Component {
	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

@mixin(ManagedStateMixin)
class TreeMenuGroup extends React.Component {
	constructor() {
		super()
		this.initManagedState(['open'])
	}

	render() {
		let children = React.Children.map(this.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, TreeMenuHeader)) {
				return React.cloneElement(elem, {
					open: this.state.open,
					opener: true,
					onTap: this.open.bind(this)
				})
			} else if (isSameOrInheritedType(elem.type, TreeMenuItem)) {
				let props = {
					open: this.state.open,
					opener: true
				}
				if (!this.props.autoOpen) props.onOpenerTap = this.open.bind(this)
				return React.cloneElement(elem, props)
			} else if (isSameOrInheritedType(elem.type, TreeMenuSubMenu)) {
				if (this.state.open) return elem
			} else {
				return elem
			}
		})
		return React.DOM.div(null, children)
	}

	open() {
		this.setManagedState({open: !this.state.open})
	}
}

class TreeMenu extends React.Component {
	static defaultProps = {
		autoOpen: false
	}

	render() {
		return React.DOM.div(null, this.processChildren(this.props.children)[1])
	}

	processChildren(children, level = 0) {
		let hasSelected
		let childrenWithProps = React.Children.map(children, (elem) => {
			let res, selected
			if (isSameOrInheritedType(elem.type, TreeMenuHeader)) {
				res = this.processHeader(elem, level)
			} else if (isSameOrInheritedType(elem.type, TreeMenuItem)) {
				[selected, res] = this.processItem(elem, level)
			} else if (isSameOrInheritedType(elem.type, TreeMenuGroup)) {
				[selected, res] = this.processGroup(elem, level)
			} else if (isSameOrInheritedType(elem.type, TreeMenuSubMenu)) {
				[selected, res] = this.processSubMenu(elem, level + 1)
			} else {
				res = elem
			}
			if (selected) hasSelected = true
			return res
		})
		return [hasSelected, childrenWithProps]
	}

	processHeader(item, level) {
		return React.cloneElement(item, {level})
	}

	processItem(item, level) {
		let isSelected = (this.props.value !== undefined) &&
			(item.props.value === this.props.value)
		let itemWithProps = React.cloneElement(item, {
			level,
			selected: isSelected,
			onTap: this.onSelect.bind(this, item)
		})
		return [isSelected, itemWithProps]
	}

	processGroup(group, level) {
		let [hasSelected, children] = this.processChildren(group.props.children, level)
		let props = {
			children,
			selected: hasSelected,
			autoOpen: this.props.autoOpen
		}
		if (this.props.autoOpen) props.open = hasSelected
		return [hasSelected, React.cloneElement(group, props)]
	}

	processSubMenu(subMenu, level) {
		let [hasSelected, children] = this.processChildren(subMenu.props.children, level)
		return [hasSelected, React.cloneElement(subMenu, {children})]
	}

	onSelect(item) {
		if (item.props.value !== undefined && this.props.onSelect) {
			this.props.onSelect(item.props.value)
		}
	}
}

export default TreeMenu
export {TreeMenuGroup, TreeMenuItem, TreeMenuHeader, TreeMenuSubMenu}
