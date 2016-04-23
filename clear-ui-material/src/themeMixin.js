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
		if (this.context.clearUiMaterialTheme !== nextContext.clearUiMaterialTheme) {
			this.setState({
				theme: {
					...lightTheme,
					...nextContext.clearUiMaterialTheme
				}
			})
		}
	}
}
