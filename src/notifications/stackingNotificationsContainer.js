import _ from 'underscore'
import React from 'react'
import {TransitionMotion, spring} from 'react-motion'

import AbstractNotificationsContainer from './abstractNotificationsContainer.js'

const fastSpringPreset = {stiffness: 320, damping: 30}

export default class StackingNotificationContext extends AbstractNotificationsContainer {
	constructor() {
		super()
		this.state = {...this.state, notifications: []}
	}

	renderNotifications() {
		let styles = this.state.notifications.map((item) => {
			return {
				key: item.key,
				style: {progress: spring(1, fastSpringPreset)},
				data: {elem: item.elem}
			}
		})

		return React.createElement(TransitionMotion, {
			styles: styles,
			willEnter: () => { return {progress: 0} },
			willLeave: () => { return {progress: spring(0, fastSpringPreset)} }
		}, (interpolatedStyles) => {
			// without flatten is doesn't reconciles correctly
			let notifications = _.flatten(
				interpolatedStyles.map(this.renderNotification.bind(this))
			)
			return <div key='hz'>{notifications}</div>
		})
	}

	renderNotification(config) {
		return [
			React.cloneElement(
				this.getChildComponent('animation'),
				{progress: config.style.progress, key: config.key},
				React.cloneElement(config.data.elem)
			),
			<br/>
		]
	}

	add(notification) {
		let key = this.getNextKey()
		let item = {key, elem: notification}
		this.setState({notifications: [...this.state.notifications, item]})
		return key
	}

	remove(key) {
		let searchFn = (item) => { return item.key !== key }
		this.setState({notifications: this.state.notifications.filter(searchFn)})
	}

	update(key, notification) {
		let updateFn = (item) => {
			if (item.key === key) return {key, elem: notification}
			else return item
		}
		this.setState({notifications: this.state.notifications.map(updateFn)})
	}
}
