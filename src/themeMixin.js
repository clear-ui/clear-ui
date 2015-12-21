import lightTheme from './styles/lightTheme'

export default {
	componentWillMount() {
		// TODO missing values
		this.state = {
			...this.state,
			theme: {
				...lightTheme,
				...this.context.clearUiMaterialTheme
			}
		}
		this.__super()
	},

	componentWillReceiveProps(nextProps, nextContext) {
		this.__super(...arguments)
		let theme = {
			...lightTheme,
			...this.context.clearUiMaterialTheme
		}
		if (theme) this.setState({theme})
	}
}

