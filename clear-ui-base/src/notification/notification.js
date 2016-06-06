import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import composeStyles from '../utils/stylesMixin/composeStyles'

import AbstractNotificationContainer from './abstractNotificationContainer.js'

/** Component that renders notification inside container. */
@mixin(StylesMixin)
class NotificationView extends React.Component {
	static displayName = 'NotificationView'

	static propTypes = {
		actions: React.PropTypes.node,
		autoHideTimeout: React.PropTypes.number,
		onClose: React.PropTypes.func
	}

	static styles = {
		root: {
			display: 'inline-table',
			textAlign: 'left'
		},
		content: {
			display: 'table-cell'
		},
		actions: {
			display: 'table-cell',
			whiteSpace: 'nowrap',
			verticalAlign: 'middle'
		}
	}

	componentDidMount() { this.setAutoHideTimeout() }
	componentWillUnmount() { this.clearAutoHideTimeout() }

	render() {
		let actions
		if (this.props.actions) {
			actions = <div style={this.styles.actions}>{this.props.actions}</div>
		}

		return (
			<div
				style={this.styles.root}
				onMouseEnter={this.clearAutoHideTimeout.bind(this)}
				onMouseLeave={this.setAutoHideTimeout.bind(this)}
			>
				<div style={this.styles.content}>
					{this.props.children}
				</div>
				{actions}
			</div>
		)
	}

	setAutoHideTimeout() {
		if (this.props.autoHideTimeout && !this.hideTimer) {
			this.hideTimer = setTimeout(this.onClose.bind(this), this.props.autoHideTimeout)
		}
	}

	clearAutoHideTimeout() {
		clearTimeout(this.hideTimer)
		this.hideTimer = undefined
	}


	onClose() {
		if (this.props.onClose) this.props.onClose()
	}
}

/**
 * Representation of the notification, that initiates render of the
 * NotificationView in the container.
 */
@mixin(PureRenderMixin) // It is required when using context container
export default class Notification extends React.Component {
	static displayName = 'Notification'

	static contextTypes = {
		notificationContainer: React.PropTypes.object
	}

	static propTypes = {
		/** Controls whether the notification is open or not. */
		open: React.PropTypes.bool.isRequired,

		/** Function that is called when notification requests to be closed. */
		onClose: React.PropTypes.func.isRequired,

		/**
		 * Elements for performing actions with notification.
		 * They are displayed after content of the notification.
		 */
		actions: React.PropTypes.node,

		/**
		 * Time in milliseconds before notification will automatically request closing,
		 * or `false` to disable auto-closing.
		 */
		autoHideTimeout: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.bool
		]),

		/**
		 * Deferred ref to the notification container where notification should be rendered.
		 * Other options how to specify in which container notification should be placed are
		 * to place notification inside the container, or to make container default
		 * by setting prop `isDefault={true}`, and then all notifications without
		 * specified container will use it.
		 */
		container: React.PropTypes.object
	}

	static defaultProps = {
		autoHideTimeout: 3000
	}

	componentDidMount() {
		this.getContainer((container) => {
			this.container = container
			this.set()
		})
	}
	componentDidUpdate() { this.set() }

	componentWillUnmount() { this.remove() }

	render() {
		return null
	}

	getContainer(callback) {
		let defaultContainer = AbstractNotificationContainer.defaultInstance
		let ctxContainer = this.context.notificationContainer
		let propsContainer = this.props.container

		if (propsContainer) {
			if (typeof this.props.container.then === 'function') propsContainer.then(callback)
			else callback(propsContainer)
		} else if (ctxContainer) {
			callback(ctxContainer)
		} else if (defaultContainer) {
			callback(defaultContainer)
		} else {
			throw new Error('You must specify container for <Notification> or ' +
				'use default container')
		}
	}

	createNotificationView() {
		let {...props, open} = this.props
		let styles = composeStyles(this.constructor.styles, this.props.styles)
		return <NotificationView {...props} styles={styles}/>
	}

	set() {
		if (this.props.open) {
			if (!this.key) this.add()
			else this.update()
		} else {
			if (this.key) this.remove()
		}
	}

	add() {
		this.key = this.container.add(this.createNotificationView())
	}

	update() {
		this.container.update(this.key, this.createNotificationView())
	}

	remove() {
		if (this.container) this.container.remove(this.key)
		this.key = undefined
	}
}
