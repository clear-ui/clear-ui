import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import {SingleNotificationContainer} from 'clear-ui-base/lib/notification'

import {Toast} from '../toast'

class Snackbar extends Toast {
	static styles = composeStyles(
		Toast.styles,
		(props) => {
			let root = {}
			let actions = {}

			if (props.mobile) {
				root.width = '100%'
				root.borderRadius = 0
				root.maxWidth = '100%'
			} else {
				root.minWidth = 288
				root.maxWidth = 568
				actions.paddingLeft = 24
			}

			root.marginTop = 0
			root.marginBottom = 0

			return {root, actions}
		}
	)
}

class SnackbarContainer extends SingleNotificationContainer {
	static defaultProps = {
		...SingleNotificationContainer.defaultProps,
		vertPos: 'bottom',
		horizPos: 'center'
	}

	static styles = composeStyles(
		SingleNotificationContainer.styles,
		{
			root: {width: '100%'}
		}
	)
}

export {Snackbar, SnackbarContainer}
