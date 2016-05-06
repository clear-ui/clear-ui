import React from 'react'
import _ from 'underscore'

import mixin from '../utils/mixin/decorator'
import StylesMixin from '../utils/stylesMixin'

export const LAYER_ATTR_NAME = 'data-clear-ui-zcontext-layer'

@mixin(StylesMixin)
export default class ZContextLayerView extends React.Component {
	static displayName = 'ZContextLayerView'

	static styles = (props) => {
		let root = {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: props.index
		}

		if (props.type === 'initial') {
			root.position = 'relative'
			root.height = '100%'
		}

		return {root}
	}


	shouldComponentUpdate(nextProps) {
		// This prevents cyclic updates, when something in the layer
		// updates ZContext on its 'didUpdate', e.g. adds new layer.
		let equal = (this.props.children === nextProps.children) &&
			_.isEqual(_.omit(this.props, 'children'), _.omit(nextProps, 'children'))
		return !equal
	}

	render() {
		return React.DOM.div({
			style: this.styles.root,
			'data-id': this.props.id,
			[LAYER_ATTR_NAME]: true
		}, this.props.children)
	}
}
