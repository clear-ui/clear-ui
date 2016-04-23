import React from 'react'

import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

class Modal extends BaseModal {
	static styles = composeStyles(
		BaseModal.styles,
		{
			root: {
				willChange: 'opacity',
				backgroundColor: 'rgba(0,0,0,.5)'
			},
			modal: {
				padding: '1.5rem',
				background: 'white',
				margin: '2rem 0',
				willChange: 'left, top, transform',
				boxShadow: SHADOWS[3]
			}
		}
	)
}

export default Modal
