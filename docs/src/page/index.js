import React from 'react'

import css from './index.scss'

export default class Page extends React.Component {
	render() {
		return React.DOM.div({className: css.page}, this.props.children)
	}
}
