import React from 'react'
import $ from 'jquery'

import Scrollspy, {ScrollspyAnchor} from 'clear-ui-base/lib/scrollspy'
import Button from 'clear-ui-simple/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

class ScrollspyDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {anchor: undefined}
	}

	render() {
		let rootStyle = {
			height: 150,
			padding: 15,
			overflowY: 'scroll',
			border: '1px solid #eee'
		}

		let placeholderStyle = {
			height: 150,
			width: '100%',
			background: '#eee',
			margin: '15px 0'
		}

		let deferred = $.Deferred()

		return <div>
			<p>
				Current anchor id: <b>{this.state.anchor}</b>{' '}
				<Button onTap={() => { this.refs.scrollspy.scrollToAnchor('2') }}>
					Scroll to second
				</Button>
			</p>

			<div ref={(elem) => { deferred.resolve(elem) }} style={rootStyle}>
				<Scrollspy ref='scrollspy' container={deferred}
					onChange={(id) => { this.setState({anchor: id}) }}>
					<Scrollspy.Anchor id='1'>First</Scrollspy.Anchor>
					<div style={placeholderStyle}/>
					<Scrollspy.Anchor id='2'>Second</Scrollspy.Anchor>
					<div style={placeholderStyle}/>
					<Scrollspy.Anchor id='3'>Third</Scrollspy.Anchor>
					<div style={placeholderStyle}/>
				</Scrollspy>
			</div>
		</div>
	}
}

export default class ScrollspyDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Scrollspy</h1>

			Scrollspy is a component for automatically updating value
			based on scroll position.

			<h2>Example</h2>

			This example uses custom container element.
			Since you can't provide <code>ref</code> to the container element
			when it is rendered in the same <code>render()</code> function,
			you should use deferreds.

			<Example>
				<Example.Demo>
					<ScrollspyDemo/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<p>
						Current anchor id: <b>{this.state.anchor}</b>{' '}
						<Button onClick={() => { this.refs.scrollspy.scrollToAnchor('2') }}>
							Scroll to second
						</Button>
					</p>

					<div ref={(elem) => { deferred.resolve(elem) }} style={rootStyle}>
						<Scrollspy ref='scrollspy' container={deferred}
							onChange={(id) => { this.setState({anchor: id}) }}>
							<ScrollspyAnchor id='1'>First</Scrollspy.Anchor>
							<div style={placeholderStyle}/>
							<ScrollspyAnchor id='2'>Second</Scrollspy.Anchor>
							<div style={placeholderStyle}/>
							<ScrollspyAnchor id='3'>Third</Scrollspy.Anchor>
							<div style={placeholderStyle}/>
						</Scrollspy>
					</div>
				`}</Example.Code>
			</Example>

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row
					name='offset'
					type='number'
					defaultValue='10'
				>{`
					Offset from top when calculating scroll position (px).
					**TODO** offset/threshold
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='threshold'
					type='number'
					defaultValue='100'
				>{`
					Distance from top to activate anchor in px.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='container'
					type='DOMElement|ReactElement|Deferred'
					default='document.body'
				>{`
					Scrollable element to spy on.<br/>
					It can be DOM-element or React element or deferred that resolves to
					one of it.
					When you use element other than <code>document.body</code>, be sure to
					set <code>overflow-y: scroll</code> and <code>height</code> to the element.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h2>Methods</h2>

			<ApiDoc>
				<ApiDoc.Row name='scrollToAnchor(anchorId)'>{`
					Scrolls to anchor specified by its id.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
