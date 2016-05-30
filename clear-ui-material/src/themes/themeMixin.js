import lightTheme from './lightTheme.js'

export default {
	componentWillMount() {
		this.state = {
			...this.state,
			theme: this.context.clearUiMaterialTheme || lightTheme
		}
		this.__super()
	},

	componentWillReceiveProps(nextProps, nextContext) {
		this.__super(...arguments)
		if (this.context.clearUiMaterialTheme !== nextContext.clearUiMaterialTheme) {
			this.setState({
				theme: nextContext.clearUiMaterialTheme || lightTheme
			})
		}
	}
}
