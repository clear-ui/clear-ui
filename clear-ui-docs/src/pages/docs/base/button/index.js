import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let buttonPropsDoc = baseDocs['button/index.js'].props
let iconButtonPropsDoc = baseDocs['button/iconButton.js'].props

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Button</h1>

			{`
			Base button component that allows to handle taps and display button states
			consistently across different input methods – touch, mouse or keyboard.
			`}

			<h2>Button API</h2>

			<h3>Props</h3>

			<PropsDoc doc={buttonPropsDoc}/>

			<h3>Methods</h3>

			<ApiDoc>
				<ApiDocRow name='focus()'>{`
					Sets focus to the button.
				`}</ApiDocRow>
				<ApiDocRow name='blur()'>{`
					Removes focus from the button.
				`}</ApiDocRow>
			</ApiDoc>

			<h3>Styleable Elements</h3>

			<ApiDoc>
				<ApiDocRow name='root'>{`Root element.`}</ApiDocRow>
				<ApiDocRow name='label'>{`Text label.`}</ApiDocRow>
			</ApiDoc>

			<h2>IconButton API</h2>

			{`
			Extends <a href='#/docs/base/button'>Base > Button</a>
			`}

			<h3>Props</h3>

			<PropsDoc doc={iconButtonPropsDoc}/>

			<h3>Styleable Elements</h3>

			<ApiDoc>
				<ApiDocRow name='leftIcon'>{`Container of the left icon.`}</ApiDocRow>
				<ApiDocRow name='rightIcon'>{`Container of the right icon.`}</ApiDocRow>
			</ApiDoc>

		</DocPage>
	}
}
