import BaseModal from 'clear-ui-base/lib/modal'
import SHADOWS from '../styles/shadows'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'

export default class Modal extends BaseModal {
	static styles = composeStyles(
		BaseModal.styles,
		{
			root: {
				backgroundColor: 'rgba(0,0,0,.5)'
			},
			modal: {
				padding: '1.5rem',
				background: 'white',
				margin: '2rem 0',
				boxShadow: SHADOWS[3]
			}
		}
	)
}
