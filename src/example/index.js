import React from 'react'
import strip from 'strip-indent'

import hljs from 'highlight.js/lib/highlight'

import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)

import '../../external/highlightjs.scss'

hljs.configure({tabReplace: '    '})

import mixin from 'clear-ui-base/lib/utils/mixin'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from 'clear-ui-simple/lib/styles/colors'
import OutlinedButton from 'clear-ui-simple/lib/button/outlinedButton'

@mixinDecorator(StylesMixin)
class Example extends React.Component {
	static styles = {
		root: {
			marginBottom: '1rem'
		}
	}

	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

@mixinDecorator(StylesMixin)
class Demo extends React.Component {
	static styles = {
		root: {
			border: `2px solid ${COLORS.black5}`,
			background: 'white',
			padding: '1.25rem'
		}
	}

	render() {
		return React.DOM.div({style: this.styles.root}, this.props.children)
	}
}

@mixinDecorator(StylesMixin)
class Code extends React.Component {
	static defaultProps = {
		lang: 'js'
	}

	static styles = {
		root: {
			position: 'relative',
			background: COLORS.black5,
			margin: 0,
			padding: '0.75rem 1.25rem'
		},

		pre: {
			overflow: 'auto',
			fontSize: '14px',
			margin: 0
		},

		copyButton: {
			position: 'absolute',
			top: '0.5rem',
			right: '0.5rem'
		}
	}

	render() {
		return (
			<div style={this.styles.root}>
				<pre style={this.styles.pre} ref='pre'>
					{this.getContent()}
				</pre>
				<div style={this.styles.copyButton}>
					<OutlinedButton
						height='small'
						onTap={this.copy.bind(this)}
						styles={{
							root: {padding: '0 0.5rem'}
						}}
					>
						Copy source
					</OutlinedButton>
				</div>
			</div>
		)

	}

	getContent() {
		return React.Children.map(this.props.children, (child) => {
			if (typeof child !== 'string') {
				console.log('Example.Code may contain only string children.')
			} else {
				let formatted = hljs.fixMarkup(strip(child).trim())
				let html = hljs.highlight(this.props.lang, formatted).value
				return React.DOM.span({
					dangerouslySetInnerHTML: {__html: html}
				})
			}
		})
	}

	copy() {
		console.log(this.refs.pre.innerText)
	}
}

Example.Demo = Demo
Example.Code = Code

export default Example
