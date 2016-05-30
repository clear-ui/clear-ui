import React from 'react'

export default class ThemeProvider extends React.Component {
	static propTypes = {
		theme: React.PropTypes.object
	}

	static childContextTypes = {
		clearUiMaterialTheme: React.PropTypes.object
	}

	getChildContext() {
		if (this.props.theme) {
			return {clearUiMaterialTheme: this.props.theme}
		}
	}

	render() {
		return this.props.children
	}
}
