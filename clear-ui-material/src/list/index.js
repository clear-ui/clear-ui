import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import ThemeMixin from '../themeMixin'
import {Menu as BaseMenu} from 'clear-ui-base/lib/menu'

class List extends BaseMenu {
	static styles = (props) => {
		let firstChildren = React.Children.toArray(props.children)[0]
		let paddingTop = (firstChildren && firstChildren.type === ListSubheader) ? 0 : 8
		return {
			root: {
				paddingTop,
				paddingBottom: 8
			}
		}
	}
}

@mixinDecorator(StylesMixin, ThemeMixin)
class ListSubheader extends React.Component {
	static styles = (props, state) => {
		return {
			root: {
				color: state.theme.secondary,
				fontSize: '14px',
				fontWeight: 500,
				lineHeight: '48px',
				paddingLeft: 16
			}
		}
	}

	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

@mixinDecorator(StylesMixin, ThemeMixin)
class ListDivider extends React.Component {
	static styles = (props, state) => {
		return {
			root: {
				margin: '8px 0',
				borderBottom: `1px solid ${state.theme.dividers}`
			}
		}
	}

	render() {
		return React.DOM.div({style: this.styles.root})
	}
}

export ListItem from './item'

export {List, ListDivider, ListSubheader}
