import React from 'react'

import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themeMixin'

/**
 * @param {node} [props.actions] - Actions of the dialog.
 * @param {node} [props.header] - Header of the dialog.
 */
@mixinDecorator(ThemeMixin)
class Dialog extends BaseModal {
	static styles = composeStyles(
		BaseModal.styles,
		(props, state) => {
			let root = {
				backgroundColor: state.theme.secondary
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

	renderModal() {
		let modal = super.renderModal()

		return React.cloneElement(modal, null, [
			this.props.header && React.DOM.div({style: this.styles.header}, this.props.header),
			React.DOM.div({style: this.styles.content}, modal.props.children),
			React.DOM.div({style: this.styles.actions}, this.props.actions)
		])
	}
}

export default Dialog
