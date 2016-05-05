import React from 'react'

import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from '../styles/colors'

@mixin(StylesMixin)
export default class MenuDivider extends React.Component {
	static styles = {
		root: {
			borderTop: `1px solid ${COLORS.black4}`
		}
	}

	render() {
		return <div style={this.styles.root}/>
	}
}
