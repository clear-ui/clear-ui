import React from 'react'
import $ from 'jquery'

import {Notification, SingleNotificationContainer, StackingNotificationContainer}
	from 'clear-ui-web/lib/notification'
import Button from 'clear-ui-web/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import NotificationExample from './example.js'
import notificationExampleCode from '!raw!./example.js'
import AbstractNotificationExample from './abstractExample.js'

import webDocs from '../../../../../docgen/web.json'
let notificationPropsDoc = webDocs['notification/notification.js'].props

export default class NotificationDoc extends React.Component {
	render() {
		let singleContainer = $.Deferred()
		let bottomLeftContainer = $.Deferred()
		let topCenterContainer = $.Deferred()

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Notifications</h1>

			<StackingNotificationContainer isDefault={true}/>
			<SingleNotificationContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
			<StackingNotificationContainer horizPos='left' vertPos='bottom'
				ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
			<StackingNotificationContainer horizPos='center' vertPos='top'
				ref={(ref) => { topCenterContainer.resolve(ref) }}/>

			{`
			Notifications display small messages on the screen for the short time.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<NotificationExample/>
				</Example.Demo>
				<Example.Code lang='js'>
					{notificationExampleCode}
				</Example.Code>
			</Example>

			<h2>Containers</h2>

			{`
			To create notification, first you need to create container.
			You can read more about containers on the page
			[Base > Notifications](#/docs/base/notifications).

			Here are some variations of notification containers.
			`}

			<h3>Stacking and single containers</h3>

			{`
			\`StackingNotificationContainer\` can display several notifications,
			one below the other.
			\`SingleNotificationContainer\` can display only one notification
			in one moment of time.
			`}

			<Example>
				<Example.Demo>
					Stacking container:
					{' '}
					<AbstractNotificationExample buttonText='First'/>
					{' '}
					<AbstractNotificationExample buttonText='Second'/>
					<br/>
					<br/>
					Single container:
					{' '}
					<AbstractNotificationExample container={singleContainer} buttonText='First'/>
					{' '}
					<AbstractNotificationExample container={singleContainer} buttonText='Second'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				let stackingContainer = $.Deferred()
				<StackingNotificationContainer ref={(ref) => { stackingContainer.resolve(ref) }}/>
				<Notification container={stackingContainer}>...</Notification>

				let singleContainer = $.Deferred()
				<SingleNotificationContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
				<Notification container={singleContainer}>...</Notification>
				`}</Example.Code>
			</Example>

			<h3>Containers position</h3>

			<Example>
				<Example.Demo>
					<AbstractNotificationExample container={bottomLeftContainer}
						buttonText='Bottom left'/>
					{' '}
					<AbstractNotificationExample container={topCenterContainer}
						buttonText='Top center'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let bottomLeftContainer = $.Deferred()
					let topCenterContainer = $.Deferred()

					<StackingNotificationContainer horizPos='left' vertPos='bottom'
						ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
					<StackingNotificationContainer horizPos='center' vertPos='top'
						ref={(ref) => { topCenterContainer.resolve(ref) }}/>
					<Notification container={bottomLeftContainer}/>
					<Notification container={topCenterContainer}/>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Sizes</h3>

			<Example>
				<Example.Demo>
					<AbstractNotificationExample size='small' buttonText='Small' key='1'/>
					{' '}
					<AbstractNotificationExample size='default' buttonText='Default' key='2'/>
					{' '}
					<AbstractNotificationExample size='big' buttonText='Big' key='3'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Notifications size='small'>...</Notification>
					<Notifications size='default'>...</Notification>
					<Notifications size='big'>...</Notification>
				`}</Example.Code>
			</Example>

			<h3>Dark</h3>

			<Example>
				<Example.Demo>
					<AbstractNotificationExample dark={true}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Notification dark={true}>Dark notification</Notification>
				`}</Example.Code>
			</Example>

			<h3>Animation</h3>

			TODO

			<h2>Container Props</h2>

			<ApiDoc>
				<ApiDocRow>
					<a href='#/docs/base/notification'>Base > Notification > Container props</a>
				</ApiDocRow>
			</ApiDoc>

			<h2>Notification Props</h2>

			<PropsDoc
				base={{
					name: 'Base > Notification > Notification props',
					url: '#/docs/base/notification'
				}}
				doc={notificationPropsDoc}
			/>
		</DocPage>
	}
}
