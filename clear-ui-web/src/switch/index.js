import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import ChildComponentsMixin from 'clear-ui-base/lib/utils/childComponentsMixin'
import BaseSwitch from 'clear-ui-base/lib/switch'
import getIconElementStyle from '../styles/getIconElementStyle'

@mixinDecorator(ChildComponentsMixin)
export default class Switch extends BaseSwitch {
	static styles = (props) => {
		let {height, padding, multiline} = props
		let styles = getIconElementStyle({
			height, padding, multiline,
			leftIcon: true
		})

		let root = {
			...styles.root,
			outline: 'none',
			cursor: 'default'
		}
		let switchElement = styles.leftIcon
		let label = styles.label

		return {root, switchElement, label}
	}
}
