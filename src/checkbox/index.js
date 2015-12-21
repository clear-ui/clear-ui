import React from 'react'

import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themeMixin'

@mixinDecorator(ThemeMixin)
class Checkbox extends BaseCheckbox {
	static styles = (props, state) => {
	}

	render() {
		let tappable = super.render()
		return React.cloneElement(tappable, {
			onTapStart: this.refs.ripple.start(),
			onTapEnd: this.refs.ripple.end()
		}, tappable.props.children)
	}

	renderContainer() {
		let label
		if (this.props.children) {
			label = React.DOM.div({style: this.styles.label}, this.props.children)
		}

		let icon = React.DOM.div({style: this.styles.icon}, [
			React.DOM.div({style: this.styles.flag},
				React.createElement(Icon, {icon: flagIcon})
			),
			React.cloneElement(this.getChildComponent('ripples'), {ref: 'ripples'})
		])

		return React.DOM.div({style: this.styles.root}, [icon, label])
	}
}

