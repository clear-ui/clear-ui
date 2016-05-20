import React from 'react'
import Markdown from 'react-markdown-it'

import ArrowIcon from './arrowIcon.js'
import css from './index.scss'

const style = {
	paddingTop: '2rem',
	paddingBottom: '4rem'
}

class DocPage extends React.Component {
	render() {
		let [firstChild, ...restChildren] = this.props.children
		if (firstChild.type === 'h1') {
			firstChild = React.cloneElement(firstChild, {
				style: {...firstChild.props.style, marginTop: 0}
			}, firstChild.props.children)
		}
		let children = [firstChild, ...restChildren]

		return React.DOM.div({className: css.docPage, style: style},
			React.createElement(Markdown, {options: {html: true}}, children)
		)
	}
}

DocPage.ArrowIcon = ArrowIcon

export default DocPage
