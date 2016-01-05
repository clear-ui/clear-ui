import React from 'react'

import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

class Modal extends BaseModal {
	static styles = composeStyles(
		BaseModal.styles,
		(props) => {
			let root = {
				willChange: 'opacity'
			}

			if (props.showOverlay) root.backgroundColor = 'rgba(0,0,0,.5)'

			let modal = {
				padding: '1.5rem',
				background: 'white',
				margin: '2rem 0',
				willChange: 'left, top, transform',
				boxShadow: SHADOWS[3]
			}

			return {root, modal}
		}
	)
}

export default Modal
