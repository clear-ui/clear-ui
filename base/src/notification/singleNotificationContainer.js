import React from 'react'
import {Motion, spring} from 'react-motion'

import AbstractNotificationContainer from './abstractNotificationContainer.js'

const fastSpringPreset = {stiffness: 320, damping: 30}

/**
 * It can render only one notification at time on the page.
 * If notification is added when there are already notification on the page,
 * it is added to the pending notifications, and is rendered only after current
 * notification closes.
 */
export default class SingleNotificationsContainer extends AbstractNotificationContainer {
	constructor() {
		super()
		this.state = {...this.state, pendingNotifications: []}
	}

	renderNotifications() {
		if (this.state.currentNotification) {
			let progress = this.state.currentNotificationIsOpen ? 1 : 0
			return React.createElement(Motion, {
				defaultStyle: {progress: 0},
				style: {progress: spring(progress, fastSpringPreset)},
				onRest: this.onRest.bind(this)
			}, this.renderNotification.bind(this))
		} else {
			return null
		}
	}

	renderNotification(style) {
		let currentNotification = this.state.currentNotification
		let elem = React.cloneElement(currentNotification.elem, {
			key: currentNotification.key,
			containerVertPos: this.props.vertPos,
			containerHorizPos: this.props.horizPos
		})
		return React.cloneElement(
			this.getChildComponent('animation'),
			{progress: style.progress},
			<div>{elem}</div>
		)
	}

	onRest() {
		if (!this.state.currentNotificationIsOpen && this.state.currentNotification) {
			let currentNotification
			let pendingNotifications = this.state.pendingNotifications
			let currentNotificationIsOpen = false
			if (pendingNotifications.length) {
				let [first, ...rest] = pendingNotifications
				currentNotification = first
				pendingNotifications = rest
				currentNotificationIsOpen = true
			}
			setTimeout(() => { // FIXME idk why it doesn't work without timeout
				this.setState({
					currentNotificationIsOpen,
					currentNotification,
					pendingNotifications
				})
			})
		}
	}

	add(notification) {
		let key = this.getNextKey()
		let item = {key, elem: notification}
		if (this.state.currentNotification) {
			let onClose = this.state.currentNotification.elem.props.onClose
			if (onClose) onClose()
			this.setState({
				pendingNotifications: [...this.state.pendingNotifications, item]
			})
		} else {
			this.setState({
				currentNotification: item,
				currentNotificationIsOpen: true
			})
		}
		return key
	}

	remove(key) {
		if (!this.mounted) return

		if (this.state.currentNotification && this.state.currentNotification.key === key) {
			this.setState({currentNotificationIsOpen: false})
		} else {
			this.setState({
				pendingNotifications: this.state.pendingNotifications.filter((item) => {
					return item.key !== key
				})
			})
		}
	}

	update(key, notification) {
		if (this.state.currentNotification.key === key) {
			this.setState({currentNotification: {key, elem: notification}})
		} else {
			let updateFn = (item) => {
				if (item.key === key) return {key, elem: notification}
				else return item
			}
			this.setState({pendingNotifications: this.state.pendingNotifications.map(updateFn)})
		}
	}
}
