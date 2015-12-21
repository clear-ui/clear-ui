import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import ThemeMixin from '../themeMixin'

class List extends React.Component {
	render() {
		return React.DOM.div({style: {padding: '8px 0'}}, this.props.children)
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
