import React from 'react'

import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'

class Modal extends BaseModal {
	static styles = (props) => {
		let root = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			overflow: 'auto',
			willChange: 'opacity',
			WebkitOverflowScrolling: 'touch'
		}

		if (props.showOverlay) {
			root.backgroundColor = 'rgba(0,0,0,.5)'
		}

		let content = {
			position: 'absolute',
			padding: '1.5rem',
			background: 'white',
			userSelect: 'text',
			margin: '2rem 0',
			willChange: 'left, top, transform',
			boxShadow: SHADOWS[3]
		}

		return {root, content}
	}
}

export default Modal
