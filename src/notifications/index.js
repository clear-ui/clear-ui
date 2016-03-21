import React from 'react'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import composeStyles from '../utils/stylesMixin/composeStyles'
import ZContext from '../zContext'
import Tappable from '../tappable'

@mixin(StylesMixin)
export class NotificationsContainer extends React.Component {
	static propTypes = {
		vertPos: React.PropTypes.oneOf(['top', 'bottom']),
		horizPos: React.PropTypes.oneOf(['left', 'right', 'center']),
		stacking: React.PropTypes.bool
	}

	static defaultProps = {
		vertPos: 'top',
		horizPos: 'right',
		stacking: true
	}

	static styles = (props) => {
		let root = {
			width: 200,
			position: 'fixed',
			bottom: 0
		}
		return {root}
	}

	constructor() {
		super()
		this.nextKey = 1
		this.state = {
			notifications: []
		}
	}

	componentDidMount() { this.constructor.instance = this }
	componentWillUnmount() { this.constructor.instance = undefined }

	render() {
		if (!this.state.notifications.length) return null

		let notifications = this.state.notifications.map((item) => {
			return React.cloneElement(item.elem, {key: item.key})
		})

		return (
			<ZContext.Layer type='notify' open={true}>
				<div style={this.styles.root}>
					{notifications}
				</div>
			</ZContext.Layer>
		)
	}

	getNextKey() {
		return this.nextKey++
	}

	add(notification) {
		let key = this.getNextKey()
		this.setState({
			notifications: [
				...this.state.notifications,
				{key, elem: notification}
			]
		})
		return key
	}

	remove(key) {
		this.setState({
			notifications: this.state.notifications.filter((item) => {
				return item.key !== key
			})
		})
	}

	update(key, notification) {
		this.setState({
			notifications: this.state.notifications.map((item) => {
				if (item.key === key) return {key, elem: notification}
				else return item
			})
		})
	}
}

@mixin(StylesMixin)
class NotificationView extends React.Component {
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

export class Notification extends React.Component {
	static propTypes = {
		open: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		showCloseButton: React.PropTypes.bool,
		actions: React.PropTypes.node,
		autoHideTimeout: React.PropTypes.number
	}

	componentDidMount() { this.set() }
	componentDidUpdate() { this.set() }
	componentWillUnmount() { this.remove() }

	createNotification() {
		let {...props, open} = this.props
		let styles = composeStyles(this.constructor.styles, this.props.styles)
		return <NotificationView {...props} styles={styles}/>
	}

	getContainer() {
		return NotificationsContainer.instance
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
		this.key = this.getContainer().add(this.createNotification())
	}

	update() {
		this.getContainer().update(this.key, this.createNotification())
	}

	remove() {
		this.getContainer().remove(this.key)
		this.key = undefined
	}

	render() {
		return null // <noscript/> ?
	}
}
