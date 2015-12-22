import React from 'react'

import isSameOrInheritedType from '../utils/isSameOrInheritedType'
import mixinDecorator from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ManagedStateMixin from '../utils/managedStateMixin'

class TreeMenu extends React.Component {
	static defaultProps = {
		useValue: true, // TODO why?
		autoOpen: false
	}

	render() {
		return React.DOM.div(null, this.processChildren(this.props.children)[1])
	}

	processChildren(children, level = 0) {
		let hasSelected
		let childrenWithProps = React.Children.map(children, (elem) => {
			let res, selected
			if (isSameOrInheritedType(elem.type, TreeMenuItem)) {
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

	processItem(item, level) {
		let isSelected
		let itemWithProps
		if (this.props.useValue) {
			isSelected = (this.props.value !== undefined) &&
				(item.props.value === this.props.value)
			itemWithProps = React.cloneElement(item, {
				level,
				selected: isSelected,
				onTap: this.onSelect.bind(this, item)
			})
		} else {
			itemWithProps = React.cloneElement(node, {level})
		}
		return [isSelected, itemWithProps]
	}

	processGroup(group, level) {
		let [hasSelected, children] = this.processChildren(group.props.children, level)
		let props = {
			children,
			selected: hasSelected,
			autoOpen: this.props.autoOpen
		}
		if (this.props.autoOpen) props.state = {open: hasSelected}
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

@mixinDecorator(StylesMixin, ChildComponentsMixin)
class TreeMenuItem extends React.Component {
	render() {
		let props = {
			...this.props,
			onSelect: () => { if (this.props.onSelect) this.props.onSelect() }
		}
		if (this.props.opener) {
			props.rightIcon = this.getChildComponent('openerIcon')
			if (!this.props.autoOpen) props.onRightIconClick = this.onOpenerTap.bind(this)
		}
		let indent = React.DOM.div({style: this.styles.indent}, this.props.children)
		return React.cloneElement(this.getChildComponent('menuItem'), props, indent)
	}

	onOpenerTap() {
		if (this.props.onOpenerTap) this.props.onOpenerTap()
	}
}

@mixinDecorator(ManagedStateMixin)
class TreeMenuGroup extends React.Component {
	render() {
		let children = React.Children.map(this.props.children, (elem) => {
			if (isSameOrInheritedType(elem.type, TreeMenuItem)) {
				let props = {
					opener: true,
					autoOpen: this.props.autoOpen,
					open: this.state.open
				}
				if (!this.props.autoOpen) props.onOpenerTap = this.onOpenerTap.bind(this)
				return React.cloneElement(elem, props)
			} else if (isSameOrInheritedType(elem.type, TreeMenuSubMenu)) {
				if (this.state.open) return elem
			} else {
				return elem
			}
		})
		return React.DOM.div(null, children)
	}

	onOpenerTap() {
		this.setManagedState({open: !this.state.open})
	}
}

@mixinDecorator(StylesMixin)
class TreeMenuSubMenu extends React.Component {
	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

export default TreeMenu
export {TreeMenuGroup, TreeMenuItem, TreeMenuSubMenu}
