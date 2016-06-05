import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import materialDocs from '../../../../../docgen/material.json'
let dialogPropsDoc = materialDocs['dialog/index.js'].props

import DialogExample from './example.js'
import dialogExampleCode from '!raw!./example.js'
import CustomizableDialogExample from './customizableExample.js'

export default class DialogDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Dialog</h1>

			{`
			Dialogs contain text and UI controls focused on a specific task.
			They inform users about critical information, require users to make decisions,
			or involve multiple tasks.
			`}

			<a
				href='https://www.google.com/design/spec/components/dialogs.html'
				target='blank'
			>
				Dialog specification
			</a>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<DialogExample/>
				</Example.Demo>
				<Example.Code>
					{dialogExampleCode}
				</Example.Code>
			</Example>

			<h2>Animations</h2>

			<Example>
				<Example.Demo>
					<CustomizableDialogExample buttonText='Fade (default)' animation='fade'/>
					{' '}
					<CustomizableDialogExample buttonText='Scale' animation='scale'/>
					{' '}
					<CustomizableDialogExample buttonText='SlideDown' animation='slideDown'/>
					{' '}
					<CustomizableDialogExample buttonText='No animation' animation={false}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Dialog animation='fade'>...</Dialog>
					<Dialog animation='scale'>...</Dialog>
					<Dialog animation='slideDown'>...</Dialog>
					<Dialog animation={false}>...</Dialog>
				`}</Example.Code>
			</Example>

			<h2>API</h2>
			{`
			Extends <a href='#/docs/base/modal'>Base > Modal props</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={dialogPropsDoc}/>

			<h3>Styleable elements</h3>
			<ApiDoc>
				<ApiDocRow name='header'>{`
					Header of the dialog.
				`}</ApiDocRow>
				<ApiDocRow name='content'>{`
					Container element for content.
				`}</ApiDocRow>
				<ApiDocRow name='actions'>{`
					Container element for actions.
				`}</ApiDocRow>
			</ApiDoc>

		</DocPage>
	}
}
