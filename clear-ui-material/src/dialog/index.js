import React from 'react'

import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themes/themeMixin'

@mixin(ThemeMixin)
export default class Dialog extends BaseModal {
	static propTypes = {
		/** Actions of the dialog. */
		actions: React.PropTypes.node,

		/** The title of the dialog. */
		header: React.PropTypes.node
	}

	static styles = composeStyles(
		BaseModal.styles,
		(props, state) => {
			let root = {
				backgroundColor: state.theme.secondary,
				WebkitTapHighlightColor: 'rgba(0,0,0,0)' // mobile
			}

			let modal = {
				background: 'white',
				margin: 24,
				willChange: 'left, top, transform',
				boxShadow: SHADOWS['24'],
				borderRadius: 2,
				minWidth: 256
			}

			let header = {
				fontSize: 24,
				padding: '24px 24px 0 24px'
			}

			let content = {
				padding: 24
			}

			let actions = {
				padding: 8,
				textAlign: 'right'
			}

			return {root, modal, header, content, actions}
		}
	)

	render() { return super.render() } // for react-docgen

	renderModal() {
		let modal = super.renderModal()

		return React.cloneElement(modal, null, [
			this.props.header && React.DOM.div({style: this.styles.header}, this.props.header),
			React.DOM.div({style: this.styles.content}, modal.props.children),
			this.props.actions && React.DOM.div({style: this.styles.actions}, this.props.actions)
		])
	}
}
