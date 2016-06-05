import React from 'react'
import $ from 'jquery'

import {Snackbar, SnackbarContainer} from 'clear-ui-material/lib/snackbar'
import {Toast, ToastContainer} from 'clear-ui-material/lib/toast'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import ToastExample from './toastExample.js'
import toastExampleCode from '!raw!./toastExample.js'
import ReusableToastExample from './reusableToastExample.js'

import SnackbarExample from './snackbarExample.js'
import snackbarExampleCode from '!raw!./snackbarExample.js'
import ReusableSnackbarExample from './reusableSnackbarExample.js'

import materialDocs from '../../../../../docgen/material.json'
let toastPropsDoc = materialDocs['toast/toast.js'].props

export default class SnackbarDoc extends React.Component {
	render() {
		let snackbarContainer = $.Deferred()
		let toastContainer = $.Deferred()
		let leftBottomContainer = $.Deferred()

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Snackbar & Toast</h1>

			<SnackbarContainer ref={(ref) => { snackbarContainer.resolve(ref) }}/>
			<ToastContainer ref={(ref) => { toastContainer.resolve(ref) }}/>

			{`
			Snackbars provide lightweight feedback about an operation by showing
			a brief message at the bottom of the screen. Snackbars can contain an action.
			`}

			<a
				href='https://www.google.com/design/spec/components/snackbars-toasts.html'
				target='blank'
			>
				Snackbar and toast specification
			</a>

			<h2>Toast</h2>

			<Example>
				<Example.Demo>
					<ToastExample/>
				</Example.Demo>
				<Example.Code>
					{toastExampleCode}
				</Example.Code>
			</Example>

			{`
			Snackbars and toasts require creating special containers.
			You can read more about containers on the page
			[Base > Notifications](#/docs/base/notifications).
			`}

			<h3>Action and close button</h3>

			<Example>
				<Example.Demo>
					<ReusableToastExample
						container={toastContainer}
						action='Action'
						onActionTap={() => { console.log('tap') }}
						showCloseButton={true}
						buttonText={'Toast with buttons'}
					>
						Toast with action and close button
					</ReusableToastExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Toast
						...
						action='Action'
						onActionTap={() => { ... }}
						showCloseButton={true}
					>
						Toast with action and close button
					</Toast>
				`}</Example.Code>
			</Example>

			<h2>Snackbar</h2>

			{`
			Snackbar appears at the bottom center of the screen,
			and is a bit wider than a toast.
			`}

			<Example>
				<Example.Demo>
					<SnackbarExample/>
				</Example.Demo>
				<Example.Code>
					{snackbarExampleCode}
				</Example.Code>
			</Example>

			{`
			As a toast, snackbar also can have action and close button.
			`}

			<Example>
				<Example.Demo>
					<ReusableSnackbarExample
						buttonText={'Snackbar with buttons'}
						container={snackbarContainer}
						action='test'
						onActionTap={() => { console.log('tap') }}
						showCloseButton={true}
					>
						Snackbar with close button and action
					</ReusableSnackbarExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar
						...
						action='test'
						onActionTap={() => { ... }}
						showCloseButton={true}
					>
						Snackbar with close button and action
					</Snackbar>
				`}</Example.Code>
			</Example>

			<h3>Multiline snackbar</h3>

			{`When snackbar has more than one line of text, it should have bigger paddings`}

			<Example>
				<Example.Demo>
					<ReusableSnackbarExample
						buttonText='Multiline snackbar'
						container={snackbarContainer}
						multiline={true}
					>
						Snackbars provide lightweight feedback about an operation
						by showing a brief message at the bottom of the screen.
						Snackbars can contain an action.
					</ReusableSnackbarExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar multiline={true} ...>...</Snackbar>
				`}</Example.Code>
			</Example>

			<h3>Mobile snackbar</h3>

			{`On the mobile platform snackbar takes up full width of the screen.`}

			<Example>
				<Example.Demo>
					<ReusableSnackbarExample
						buttonText='Mobile snackbar'
						container={snackbarContainer}
						mobile={true}
					>
						Mobile snackbar
					</ReusableSnackbarExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Snackbar mobile={true} ...>Mobile snackbar</Snackbar>
				`}</Example.Code>
			</Example>

			<h2>Toast API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>Base > Notification</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={toastPropsDoc}/>

			<h2>ToastContainer API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>
				Base > Notification > SingleNotificationContainer
			</a>
			`}

			<h2>Snackbar API</h2>

			{`
			Extends
			<a href='#/docs/material/snackbar'>Material > Toast</a>
			`}

			<h3>Props</h3>
			<ApiDoc>
				<ApiDocRow name='mobile' type='boolean'>{`
					Variation of the snackbar for the mobile platform that
					takes up full width of the screen.
				`}</ApiDocRow>
			</ApiDoc>

			<h2>SnackbarContainer API</h2>

			{`
			Extends
			<a href='#/docs/base/notification'>
				Base > Notification > SingleNotificationContainer
			</a>
			`}
		</DocPage>
	}
}
