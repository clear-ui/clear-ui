import React from 'react'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import composeStyles from '../utils/stylesMixin/composeStyles'
import Tappable from '../tappable'

import AbstractNotificationsContainer from './abstractNotificationsContainer.js'

@mixin(StylesMixin)
class NotificationView extends React.Component {
	static displayName = 'NotificationView'

	static styles = {
		root: {
			display: 'inline-block'
		}
	}

	componentDidMount() {
		if (this.props.autoHideTimeout) {
			this.hideTimer = setTimeout(this.onClose.bind(this), this.props.autoHideTimeout)
		}
	}

	componentWillUnmount() {
		clearTimeout(this.hideTimer)
	}

	render() {
		let actions
		if (this.props.actions) {
			actions = <div style={this.styles.actions}>{this.props.actions}</div>
		}

		let closeButton
		if (this.props.showCloseButton) {
			closeButton = (
				<Tappable
					onTap={this.onClose.bind(this)}
					onChangeTapState={() => {
						// TODO
					}}
				>
					<div style={this.styles.closeButton}/>
				</Tappable>
			)
		}

		return (
			<div style={this.styles.root}>
				{this.props.children}
				{actions}
				{closeButton}
			</div>
		)
	}

	onClose() {
		if (this.props.onClose) this.props.onClose()
		clearTimeout(this.hideTimer)
	}
}

export default class Notification extends React.Component {
	static displayName = 'Notification'

	static propTypes = {
		open: React.PropTypes.bool.isRequired,
		onClose: React.PropTypes.func.isRequired,
		showCloseButton: React.PropTypes.bool,
		actions: React.PropTypes.node,
		autoHideTimeout: React.PropTypes.number,
		container: React.PropTypes.object
	}

	static contextTypes = {
		notificationsContainer: React.PropTypes.object
	}

	componentDidMount() {
		this.getContainer((container) => {
			this.container = container
			this.set()
		})
	}
	componentDidUpdate() { this.set() }
	componentWillUnmount() { this.remove() }

	getContainer(callback) {
		let ctxContainer = this.context.notificationsContainer
		let defaultContainer = AbstractNotificationsContainer.defaultInstance
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

	createNotification() {
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
		this.key = this.container.add(this.createNotification())
	}

	update() {
		this.container.update(this.key, this.createNotification())
	}

	remove() {
		if (this.container) this.container.remove(this.key)
		this.key = undefined
	}

	render() {
		return null
	}
}
