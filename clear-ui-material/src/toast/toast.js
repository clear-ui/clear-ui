import React from 'react'
import Color from 'color'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import ThemeMixin from '../themeMixin'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import Tappable from 'clear-ui-base/lib/tappable'
import Icon from 'clear-ui-base/lib/icon'
import {Notification} from 'clear-ui-base/lib/notification'
import COLORS from '../styles/colors'

@mixin(ThemeMixin, StylesMixin)
class ToastAction extends React.Component {
	static contextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	static styles = (props, state) => {
		let root = {
			textTransform: 'uppercase',
			cursor: 'pointer',
			fontWeight: 500,
			display: 'inline-block',
			userSelect: 'none',
			padding: 8,
			marginLeft: -8,
			marginRight: 16
		}

		let baseColor = props.color || state.theme.accent
		let color
		if (state.tapState.pressed) {
			color = new Color(baseColor).mix(new Color('white'), 0.6)
		} else if (state.tapState.hovered) {
			color = new Color(baseColor).mix(new Color('white'), 0.8)
		} else {
			color = baseColor
		}

		root.color = color
		root.fill = color

		return {root}
	}

	state = {tapState: {hovered:false, pressed: false}}

	render() {
		return React.createElement(Tappable, {
			onTap: this.props.onTap,
			onChangeTapState: (tapState) => { this.setState({tapState}) }
		},
			<div style={this.styles.root} title={this.props.title}>
				{this.props.children}
			</div>
		)
	}
}

const CONTAINER_MARGIN = 16

export default class Toast extends Notification {
	static propTypes = {
		...Notification.propTypes,

		/** Label of the action in the snackbar. */
		action: React.PropTypes.node,

		/**
		 * Function that is called when action button is tapped.
		 * After performing an action, `onClose` callback also will be called.
		 */
		onActionTap: React.PropTypes.func,

		/** If `true`, the toast will have the close button. */
		showCloseButton: React.PropTypes.bool,

		/** Title that is shown when close button is hovered. */
		closeButtonTitle: React.PropTypes.string
	}

	static defaultProps = {
		...Notification.defaultProps,
		closeButtonTitle: 'Dimiss'
	}

	static styles = (props) => {
		const vertPadding = props.multiline ? 24 : 14

		let root = {
			borderRadius: 2,
			fontSize: 14,
			background: '#323232',
			color: 'white',
			maxWidth: 428,
			lineHeight: '20px',
			userSelect: 'none'
		}

		if (props.containerHorizPos === 'left') root.marginLeft = CONTAINER_MARGIN
		else root.marginRight = CONTAINER_MARGIN

		if (props.containerVertPos === 'top') root.marginTop = CONTAINER_MARGIN
		else root.marginBottom = CONTAINER_MARGIN

		let content = {
			paddingTop: vertPadding,
			paddingBottom: vertPadding,
			paddingLeft: 24,
			paddingRight: 24,
			verticalAlign: 'middle'
		}

		let actions = {
			width: 1, // that makes cell shrink to content width
			verticalAlign: 'middle'
		}

		return {root, content, actions}
	}

	createNotificationView() {
		let view = super.createNotificationView()

		let action
		if (this.props.action) {
			action = <ToastAction onTap={() => {
				if (this.props.onActionTap) this.props.onActionTap()
				if (this.props.onClose) this.props.onClose()
			}}>
				{this.props.action}
			</ToastAction>
		}

		let closeButton
		if (this.props.showCloseButton) {
			closeButton = (
				<ToastAction
					onTap={this.props.onClose.bind(this)}
					color={COLORS.grey500}
					title={this.props.closeButtonTitle}
				>
					<Icon icon={Icon.ICONS.close} size={16} inline={true}/>
				</ToastAction>
			)
		}

		return React.cloneElement(view, {
			actions: [action, closeButton]
		})
	}

	render() { return super.render() } // for react-docgen
}
