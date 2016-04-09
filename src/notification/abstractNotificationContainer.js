import React from 'react'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'
import ChildComponentsMixin from '../utils/childComponentsMixin'
import ZContext from '../zContext'
import Animation, {fade, fadeAndSlide} from '../animations'

@mixin(StylesMixin, ChildComponentsMixin)
export default class AbstractNotificationsContainer extends React.Component {
	static childContextTypes = {
		notificationContainer: React.PropTypes.object
	}

	getChildContext() {
		return {notificationContainer: this}
	}

	static propTypes = {
		/**
		 * Makes container default. Notifications without specified container will be
		 * placed inside the default container.
		 */
		isDefault: React.PropTypes.bool,

		/** Horizontal position of the container. */
		vertPos: React.PropTypes.oneOf(['top', 'bottom']),

		/** Vertical position of the container. */
		horizPos: React.PropTypes.oneOf(['left', 'right', 'center']),

		animation: React.PropTypes.string // TODO
	}

	static defaultProps = {
		vertPos: 'top',
		horizPos: 'right',
		animation: 'slide'
	}

	static styles = (props) => {
		let root = {
			position: 'fixed'
		}

		if (props.vertPos === 'top') root.top = 0
		else if (props.vertPos === 'bottom') root.bottom = 0

		if (props.horizPos === 'left') {
			root.left = 0
			root.textAlign = 'left'
		} else if (props.horizPos === 'right') {
			root.right = 0
			root.textAlign = 'right'
		} else if (props.horizPos === 'center') {
			root.left = '50%'
			root.transform = 'translateX(-50%)'
			root.textAlign = 'center'
		}

		return {root}
	}

	static childComponents = {
		animation: (props) => {
			if (props.animation === 'fade') {
				return React.createElement(Animation, {fn: fade})
			} else if (props.animation === 'slide') {
				return React.createElement(Animation, {
					fn: fadeAndSlide,
					params: {
						side: props.vertPos === 'top' ? 'bottom' : 'top',
						distance: 50,
						unit: '%'
					}
				})
			}
		}
	}

	constructor() {
		super()
		this.nextKey = 1
	}

	componentDidMount() {
		this.mounted = true
		if (this.props.isDefault) AbstractNotificationsContainer.defaultInstance = this
	}

	componentWillUnmount() {
		this.mounted = false
		if (this.props.isDefault) AbstractNotificationsContainer.defaultInstance = undefined
	}

	getNextKey() {
		return this.nextKey++
	}

	render() {
		return (
			<span>
				<ZContext.Layer type='notify' open={true}>
					<div style={this.styles.root}>
						{this.renderNotifications()}
					</div>
				</ZContext.Layer>
				{this.props.children}
			</span>
		)
	}

	renderNotifications() { throw new Error('Not implemented') }
	add(/* notification */) /* : key */ { throw new Error('Not implemented') }
	remove(/* key */) { throw new Error('Not implemented') }
	update(/* key, notification */) { throw new Error('Not implemented') }
}
