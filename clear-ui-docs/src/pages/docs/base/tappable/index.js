import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import TappableExample from './example'
import tappableExampleCode from '!raw!./example'

import baseDocs from '../../../../../docgen/base.json'
let tappablePropsDoc = baseDocs['tappable/tappable.js'].props
let focusableTappablePropsDoc = baseDocs['tappable/focusableTappable.js'].props

export default class TappableDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Tappable</h1>

			{`
			Tappable is a helper component for creating button-like components.

			It helps to handle pressed and hovered states, and it implements custom \`onTap\`
			event that works consistently with touch and with mouse.

			- When you start scrolling, touch event is cancelled.
			- TODO? When you move the touch away from the element, pressed state is removed.
			Element becomes pressed again when touch returns.
			- When you move cursor outside of the element while pressing mouse button,
			pressed state is removed. Element becomes pressed again when cursor returns.
			`}

			<h2>Example</h2>

			{`
			Here is an example of simple button using Tappable:
			`}

			<Example>
				<Example.Demo>
					<TappableExample/>
				</Example.Demo>
				<Example.Code>
					{tappableExampleCode}
				</Example.Code>
			</Example>

			<h2>Tappable API</h2>

			<h3>Props</h3>
			<PropsDoc doc={tappablePropsDoc}/>

			<h2>FocusableTappable API</h2>

			{`
			Extends <a href='#/docs/base/tappable'>Base > Tappable</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={focusableTappablePropsDoc}/>
		</DocPage>
	}
}
