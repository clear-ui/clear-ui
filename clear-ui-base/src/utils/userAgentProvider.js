import React from 'react'

export default class UserAgentProvider extends React.Component {
	static propTypes = {
		userAgent: React.PropTypes.string
	}

	static childContextTypes = {
		clearUiUserAgent: React.PropTypes.string
	}

	getChildContext() {
		return {clearUIUserAgent: this.props.userAgent}
	}

	render() {
		return this.props.children
	}
}
